// backend/src/services/smartmoney/smartmoney.parser.js

import axios from "axios";
import { saveSmartMoneyTx, updateSmartWallet } from "../../database/queries/smartmoney.query.js";
import parseUnits from "./utils/units.js";
import price from "./utils/price.js";

// Detect action type from input & output token
function detectAction(tokenIn, tokenOut) {
    if (!tokenIn || !tokenOut) return "unknown";

    const stable = ["USDT", "USDC", "DAI", "BUSD"];

    if (stable.includes(tokenIn) && !stable.includes(tokenOut)) return "buy";

    if (!stable.includes(tokenIn) && stable.includes(tokenOut)) return "sell";

    return "swap";
}

// Normalize token names
function simplifyToken(symbol = "") {
    if (!symbol) return "";
    return symbol.toUpperCase().replace("W", "").replace("'", "");
}

// Main Parser
export async function parseSmartMoneyTx(chain, txHash, httpUrl) {
    try {
        // STEP 1 - Fetch transaction by hash
        const rpcTx = await axios.post(httpUrl, {
            jsonrpc: "2.0",
            method: "eth_getTransactionByHash",
            params: [txHash],
            id: 1
        });

        const tx = rpcTx?.data?.result;
        if (!tx || !tx.to) return;

        const wallet = tx.from.toLowerCase();

        // STEP 2 - Fetch receipt to decode logs (tokens swapped)
        const rpcReceipt = await axios.post(httpUrl, {
            jsonrpc: "2.0",
            method: "eth_getTransactionReceipt",
            params: [txHash],
            id: 2
        });

        const receipt = rpcReceipt?.data?.result;
        if (!receipt || !receipt.logs) return;

        // STEP 3 — Parse SWAP logs (Uniswap, Pancakeswap, QuickSwap etc.)
        let tokenIn = "";
        let tokenOut = "";
        let amountIn = 0;
        let amountOut = 0;

        receipt.logs.forEach(log => {
            // Universal Swap Event topic hash
            const swapTopic = "0xd78ad95fa46c994b6551d0da85fc275fe613d49443d1c13adbe1145aeae33c3f";

            if (log.topics[0] === swapTopic) {
                try {
                    // decode swap amounts
                    const data = log.data.replace("0x", "");
                    const raw1 = BigInt("0x" + data.slice(0, 64));
                    const raw2 = BigInt("0x" + data.slice(64, 128));

                    if (raw1 > 0n) amountIn = Number(raw1);
                    if (raw2 > 0n) amountOut = Number(raw2);
                } catch {}
            }
        });

        if (!amountIn && !amountOut) return; // not a swap

        // STEP 4 — Identify Tokens
        tokenIn = simplifyToken("TOKEN-IN");
        tokenOut = simplifyToken("TOKEN-OUT");

        // Future improvement → auto fetch token symbols via RPC
        // For now placeholder

        // STEP 5 — Human readable amounts
        const amountInHuman = parseUnits(amountIn);
        const amountOutHuman = parseUnits(amountOut);

        // STEP 6 — Price Fetch
        const usdValue = await price(tokenOut, amountOutHuman);

        // STEP 7 — BUY/SELL/SWAP detection
        const action = detectAction(tokenIn, tokenOut);

        // STEP 8 — Smart Score (v1 - basic)
        const score = action === "buy" && usdValue > 50000
            ? 90
            : action === "buy"
            ? 70
            : action === "sell"
            ? 40
            : 55;

        // STEP 9 — Create DB Object
        const data = {
            chain,
            hash: txHash,
            wallet,
            tokenIn,
            tokenOut,
            amountIn: amountInHuman,
            amountOut: amountOutHuman,
            usdValue,
            label: "smartmoney",
            score,
            action,
            tokenAddress: tx.to,
            timestamp: Date.now(),
            source: "smartmoney"
        };

        // STEP 10 — Save TX
        await saveSmartMoneyTx(data);

        // STEP 11 — Update Wallet Profile
        await updateSmartWallet(wallet, {
            lastUpdated: Date.now(),
            avgScore: score,
        });

        console.log(`🤖 SmartMoney ${chain}: ${action.toUpperCase()} | $${usdValue} | ${wallet}`);

    } catch (err) {
        // Silent fail allowed (high traffic mode)
        // console.log("Parser error:", err.message);
    }
}
