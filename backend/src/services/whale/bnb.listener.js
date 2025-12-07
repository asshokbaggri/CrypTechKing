// backend/src/services/whale/bnb.listener.js

import WebSocket from "ws";
import axios from "axios";
import chains from "../../config/chains.js";
import { saveWhaleTx } from "../../database/queries/whales.query.js";

export default function startBNBWhaleListener() {

    const wsUrl = chains.BNB.WS;
    const httpUrl = chains.BNB.HTTP;

    if (!wsUrl || !httpUrl) {
        return console.error("❌ BNB WS/HTTP URL missing in Railway env!");
    }

    console.log("🔌 Connecting to BNB WebSocket…");

    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
        console.log("🟢 BNB WebSocket Connected!");

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
            if (!data?.params?.result) return;

            const txHash = data.params.result;

            // Fetch full TX details
            const tx = await axios.post(httpUrl, {
                jsonrpc: "2.0",
                method: "eth_getTransactionByHash",
                params: [txHash],
                id: 1
            });

            const txData = tx?.data?.result;
            if (!txData) return;

            // Filter 1) Ignore contract interactions
            if (txData.input && txData.input !== "0x") return;

            // Filter 2) Ignore zero-value transfers
            const bnbValue = Number(txData.value) / 1e18;
            if (bnbValue <= 50) return; // adjust threshold if required

            // Filter 3) Ignore null addresses
            if (!txData.from || !txData.to) return;

            // OPTIONAL: ignore known spam/MEV bots
            const spamAddresses = [
                "0x0000000000000000000000000000000000001000"
            ];
            if (spamAddresses.includes(txData.from)) return;

            console.log(`🐋 BNB Whale: ${bnbValue} BNB | ${txData.from} → ${txData.to}`);

            // Save to DB
            await saveWhaleTx({
                chain: "BNB",
                hash: txData.hash,
                from: txData.from,
                to: txData.to,
                amountEth: bnbValue,
                usdValue: 0,
                fromLabel: "",
                toLabel: "",
                source: "websocket",
                timestamp: Date.now()
            });

            console.log("💾 Saved BNB Whale to DB");

        } catch (err) {
            // ignore small errors
        }
    });

    ws.on("close", () => {
        console.log("🔴 BNB WS Closed → Reconnecting in 3s…");
        setTimeout(startBNBWhaleListener, 3000);
    });

    ws.on("error", (err) => {
        console.error("⚠️ BNB WebSocket Error:", err.message);
    });
}
