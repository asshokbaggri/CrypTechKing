// backend/src/services/smartmoney/sm.listener.polygon.js

import WebSocket from "ws";
import chains from "../../config/chains.js";
import { analyzeSmartMoneyTx } from "./sm.analyzer.js";

export default function startSmartMoneyPOLYGON() {
    const wsUrl = chains.POLYGON.WS;
    const httpUrl = chains.POLYGON.HTTP;

    if (!wsUrl || !httpUrl) {
        console.log("❌ Polygon SmartMoney RPC missing");
        return;
    }

    console.log("🔌 Connecting SmartMoney Polygon WebSocket…");

    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
        console.log("🟢 SmartMoney Polygon Connected");

        ws.send(JSON.stringify({
            jsonrpc: "2.0",
            id: 200,
            method: "eth_subscribe",
            params: ["newPendingTransactions"]
        }));
    });

    ws.on("message", async (msg) => {
        try {
            const data = JSON.parse(msg);
            const txHash = data?.params?.result;
            if (!txHash) return;

            await analyzeSmartMoneyTx("POLYGON", txHash, httpUrl);

        } catch {}
    });

    ws.on("close", () => {
        console.log("🔴 SmartMoney Polygon Disconnected → Reconnecting…");
        setTimeout(startSmartMoneyPOLYGON, 3000);
    });

    ws.on("error", (err) => {
        console.log("⚠️ SmartMoney Polygon Error:", err.message);
    });
}
