// backend/src/services/whale/polygon.listener.js

import WebSocket from "ws";
import axios from "axios";
import chains from "../../config/chains.js";
import { saveWhaleTx } from "../../database/queries/whales.query.js";

export default function startPolygonWhaleListener() {
    const wsUrl = chains.POLYGON.WS;
    const httpUrl = chains.POLYGON.HTTP;

    if (!wsUrl || !httpUrl) {
        return console.error("❌ POLYGON WS/HTTP URL missing!");
    }

    console.log("🔌 Connecting to Polygon WebSocket…");

    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
        console.log("🟢 Polygon WebSocket Connected!");

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

            const tx = await axios.post(httpUrl, {
                jsonrpc: "2.0",
                method: "eth_getTransactionByHash",
                params: [txHash],
                id: 1
            });

            const txData = tx?.data?.result;
            if (!txData) return;

            // Convert wei → MATIC
            const valueMATIC = Number(txData.value) / 1e18;

            // Whale threshold (custom)
            if (valueMATIC >= 40) {
                console.log(`🐋 Polygon Whale: ${valueMATIC} MATIC | ${txData.from} → ${txData.to}`);

                await saveWhaleTx({
                    chain: "POLYGON",
                    hash: txData.hash,
                    from: txData.from,
                    to: txData.to,
                    amountEth: valueMATIC,
                    usdValue: 0,
                    source: "websocket",
                    timestamp: Date.now()
                });

                console.log("💾 Saved Polygon Whale to DB");
            }

        } catch (err) {
            // Ignore small parsing errors
        }
    });

    ws.on("close", () => {
        console.log("🔴 Polygon WS Closed → Reconnecting in 3s…");
        setTimeout(startPolygonWhaleListener, 3000);
    });

    ws.on("error", (err) => {
        console.error("⚠️ Polygon WebSocket Error:", err.message);
    });
}
