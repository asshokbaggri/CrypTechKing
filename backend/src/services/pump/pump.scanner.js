// backend/src/services/pump/pump.scanner.js

import axios from "axios";
import { calculateHypeScore } from "./pump.score.js";
import { savePumpTrend } from "../../database/queries/pump.query.js";

// BOT ALERTS
import { sendTelegramPumpAlert } from "../alerts/telegram.bot.js";
import { tweetPump } from "../alerts/twitter.bot.js";

export class PumpScanner {
    constructor() {
        this.interval = 120 * 1000; // Run every 2 minutes (Cloudflare safe)
    }

    async fetchTrending() {
        try {
            const res = await axios.get(
                "https://api.dexscreener.com/latest/dex/tokens",
                {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (CrypTechKing Bot)",
                        "Cache-Control": "no-cache",
                        "Accept": "application/json"
                    },
                    timeout: 8000,
                    validateStatus: () => true // prevent crash on 403/404/500
                }
            );

            // Cloudflare / HTML response → skip cycle
            if (!res.data || !res.data.pairs) {
                console.log("⚠️ Dex API blocked / returned HTML. Skipping this cycle.");
                return;
            }

            const tokens = res.data.pairs.slice(0, 50); // top 50 trending

            for (const token of tokens) {
                const score = calculateHypeScore({
                    volume: token.volume?.h24 || 0,
                    liquidity: token.liquidity?.usd || 0,
                    priceChange: token.priceChange?.h1 || 0,
                    buys: token.buys || 0,
                    sells: token.sells || 0
                });

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

                // SAVE IN DB
                await savePumpTrend(data);

                // ALERTS (if hype is high)
                if (score > 80) {
                    await sendTelegramPumpAlert(data);
                    await tweetPump(data);
                }
            }

            console.log("🔥 Pump scan completed successfully");

        } catch (err) {
            console.log("❌ Pump Scanner Error:", err.message);
        }
    }

    start() {
        this.fetchTrending();
        setInterval(() => this.fetchTrending(), this.interval);
        console.log("Pump Scanner Running...");
    }
}

export default new PumpScanner();
