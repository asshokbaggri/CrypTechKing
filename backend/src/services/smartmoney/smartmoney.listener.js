import WebSocket from "ws";
import axios from "axios";
import chains from "../../config/chains.js";
import smartWallets from "./smartmoney.wallets.js";
import { saveSmartTx } from "../../database/queries/smartmoney.query.js";

export default function startSmartMoneyListener() {
    startForChain("ETH", chains.ETH);
    startForChain("POLYGON", chains.POLYGON);
    startForChain("BNB", chains.BNB);
}

function startForChain(chainName, chain) {
    if (!chain.WS || !chain.HTTP) {
        console.log(`❌ Missing RPC for ${chainName}`);
        return;
    }

    console.log(`🔌 Connecting Smart Money → ${chainName} WebSocket…`);

    const ws = new WebSocket(chain.WS);

    ws.on("open", () => {
        console.log(`🟢 SmartMoney ${chainName} Connected`);

        ws.send(JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_subscribe",
            params: ["newPendingTransactions"]
        }));
    });

    ws.on("message", async (msg) => {
        try {
            const data = JSON.parse(msg);
            const hash = data?.params?.result;
            if (!hash) return;

            const tx = await axios.post(chain.HTTP, {
                jsonrpc: "2.0",
                method: "eth_getTransactionByHash",
                params: [hash],
                id: 1
            });

            const t = tx?.data?.result;
            if (!t) return;

            const from = (t.from || "").toLowerCase();

            // FILTER: Smart Money Only
            if (!smartWallets.includes(from)) return;

            const value = Number(t.value) / 1e18;

            console.log(
                `🧠 SMART MONEY (${chainName}): ${value} | ${t.from} → ${t.to}`
            );

            await saveSmartTx({
                chain: chainName,
                hash,
                from: t.from,
                to: t.to,
                amount: value,
                timestamp: Date.now(),
            });

        } catch (err) {}
    });

    ws.on("close", () => {
        console.log(`🔴 ${chainName} SmartMoney WS Closed → Reconnecting…`);
        setTimeout(() => startForChain(chainName, chain), 2500);
    });

    ws.on("error", (err) => {
        console.log(`⚠️ SmartMoney ${chainName} WS Error:`, err.message);
    });
}
