// backend/src/services/pump/pump.scanner.js

import axios from "axios";
import { calculateHypeScore } from "./pump.score.js";
import { savePumpTrend } from "../../database/queries/pump.query.js";

// 🔥 ADD THESE IMPORTS (BOT ALERTS)
import { sendTelegramPumpAlert } from "../alerts/telegram.bot.js";
import { tweetPump } from "../alerts/twitter.bot.js";

export class PumpScanner {
    constructor() {
        this.interval = 30 * 1000; // every 30 sec
    }

    async fetchTrending() {
        try {
            const res = await axios.get("https://api.dexscreener.com/latest/dex/tokens");

            if (!res.data || !res.data.pairs) return;

            const tokens = res.data.pairs.slice(0, 50); // top 50 trending

            for (const token of tokens) {
                
                // 🧠 Calculate hype score
                const score = calculateHypeScore({
                    volume: token.volume?.h24 || 0,
                    liquidity: token.liquidity?.usd || 0,
                    priceChange: token.priceChange?.h1 || 0,
                    buys: token.buys || 0,
                    sells: token.sells || 0
                });

                // Data object for DB + bots
                const data = {
                    address: token.baseToken?.address || "",
                    symbol: token.baseToken?.symbol || "",
                    chain: token.chainId || "",
                    price: token.priceUsd || 0,
                    volume24h: token.volume?.h24 || 0,
                    liquidity: token.liquidity?.usd || 0,
                    buys: token.buys || 0,
                    sells: token.sells || 0,
                    priceChange1h: token.priceChange?.h1 || 0,
                    hypeScore: score,
                    timestamp: Date.now()
                };

                // 💾 Save to DB
                await savePumpTrend(data);

                // 🚀 Pump Alerts (ONLY if hype score > 80)
                if (score > 80) {
                    await sendTelegramPumpAlert(data);
                    await tweetPump(data);
                }
            }

            console.log("🔥 Pump scan complete");

        } catch (err) {
            console.log("Pump Scanner Error:", err);
        }
    }

    start() {
        this.fetchTrending();
        setInterval(() => this.fetchTrending(), this.interval);
        console.log("Pump Scanner Running...");
    }
}

export default new PumpScanner();
