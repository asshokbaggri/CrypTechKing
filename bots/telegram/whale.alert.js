// bots/telegram/whale.alert.js

import axios from "axios";
import { api } from "../../frontend/src/utils/api.js"; // OR directly fetch backend URL

const BOT_TOKEN = "PASTE_TELEGRAM_BOT_TOKEN";
const CHAT_ID = "PASTE_TELEGRAM_CHANNEL_ID";

export async function sendTelegramWhaleAlert(tx) {
    const text = `
🐋 *Whale Alert!*  
Chain: ${tx.chain}
Amount: $${tx.usdValue.toLocaleString()}
From: ${tx.fromLabel}
To: ${tx.toLabel}
Hash: ${tx.hash}
    `;

    await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
            chat_id: CHAT_ID,
            text,
            parse_mode: "Markdown"
        }
    );
}

export async function sendTelegramPumpAlert(coin) {
    const text = `
🚀 *Pump Alert!*  
Token: ${coin.symbol}
Hype Score: ${coin.hypeScore}
Price: $${coin.price}
Liquidity: $${coin.liquidity.toLocaleString()}
Volume 24h: $${coin.volume24h.toLocaleString()}
    `;

    await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
            chat_id: CHAT_ID,
            text,
            parse_mode: "Markdown"
        }
    );
}
