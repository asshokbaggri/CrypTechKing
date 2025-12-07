import WebSocket from "ws";
import axios from "axios";
import { saveWhaleTx } from "../../database/queries/whales.query.js";

export default function startETHWhaleListener() {
    const wsUrl = process.env.ETH_WS_URL;
    const httpUrl = process.env.ETH_HTTP_URL;

    if (!wsUrl || !httpUrl) {
        return console.error("❌ ETH WS/HTTP URL missing in Railway env!");
    }

    console.log("🔌 Connecting to Ethereum WebSocket…");

    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
        console.log("🟢 ETH WebSocket Connected!");

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

            const valueETH = Number(txData.value) / 1e18;

            // Whale threshold
            if (valueETH >= 25) {
                console.log(`🐋 ETH Whale: ${valueETH} ETH | ${txData.from} → ${txData.to}`);

                const whaleRecord = {
                    chain: "ETH",
                    hash: txHash,
                    from: txData.from,
                    to: txData.to,
                    amountEth: valueETH,
                    usdValue: null, // later add price API
                    fromLabel: "",
                    toLabel: "",
                    source: "live",
                    timestamp: Date.now()
                };

                await saveWhaleTx(whaleRecord);
            }

        } catch (err) {
            // ignore
        }
    });

    ws.on("close", () => {
        console.log("🔴 ETH WS Closed → Reconnecting in 3s…");
        setTimeout(startETHWhaleListener, 3000);
    });

    ws.on("error", (err) => {
        console.error("⚠️ ETH WebSocket Error:", err.message);
    });
}
