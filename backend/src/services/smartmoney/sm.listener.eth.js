// backend/src/services/smartmoney/sm.listener.eth.js

import WebSocket from "ws";
import chains from "../../config/chains.js";
import { analyzeSmartMoneyTx } from "./sm.analyzer.js";

export default function startSmartMoneyETH() {
    const wsUrl = chains.ETH.WS;
    const httpUrl = chains.ETH.HTTP;

    if (!wsUrl || !httpUrl) {
        console.log("❌ ETH SmartMoney RPC missing");
        return;
    }

    console.log("🔌 Connecting SmartMoney ETH WebSocket…");

    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
        console.log("🟢 SmartMoney ETH Connected");

        ws.send(JSON.stringify({
            jsonrpc: "2.0",
            id: 100,
            method: "eth_subscribe",
            params: ["newPendingTransactions"]
        }));
    });

    ws.on("message", async (msg) => {
        try {
            const data = JSON.parse(msg);
            const txHash = data?.params?.result;
            if (!txHash) return;

            await analyzeSmartMoneyTx("ETH", txHash, httpUrl);

        } catch {}
    });

    ws.on("close", () => {
        console.log("🔴 SmartMoney ETH Disconnected → Reconnecting…");
        setTimeout(startSmartMoneyETH, 3000);
    });

    ws.on("error", (err) => {
        console.log("⚠️ SmartMoney ETH Error:", err.message);
    });
}
