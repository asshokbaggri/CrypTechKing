// backend/src/services/smartmoney/sm.listener.bnb.js

import WebSocket from "ws";
import chains from "../../config/chains.js";
import { analyzeSmartMoneyTx } from "./sm.analyzer.js";

export default function startSmartMoneyBNB() {
    const wsUrl = chains.BNB.WS;
    const httpUrl = chains.BNB.HTTP;

    if (!wsUrl || !httpUrl) {
        console.log("❌ BNB SmartMoney RPC missing");
        return;
    }

    console.log("🔌 Connecting SmartMoney BNB WebSocket…");

    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
        console.log("🟢 SmartMoney BNB Connected");

        ws.send(JSON.stringify({
            jsonrpc: "2.0",
            id: 300,
            method: "eth_subscribe",
            params: ["newPendingTransactions"]
        }));
    });

    ws.on("message", async (msg) => {
        try {
            const data = JSON.parse(msg);
            const txHash = data?.params?.result;
            if (!txHash) return;

            await analyzeSmartMoneyTx("BNB", txHash, httpUrl);

        } catch {}
    });

    ws.on("close", () => {
        console.log("🔴 SmartMoney BNB Disconnected → Reconnecting…");
        setTimeout(startSmartMoneyBNB, 3000);
    });

    ws.on("error", (err) => {
        console.log("⚠️ SmartMoney BNB Error:", err.message);
    });
}
