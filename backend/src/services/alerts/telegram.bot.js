import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHANNEL_ID;

export async function sendTelegramWhaleAlert(tx) {
    const text = `
🐋 *Whale Alert*
Chain: ${tx.chain}
Amount: $${tx.usdValue.toLocaleString()}
From: ${tx.fromLabel}
To: ${tx.toLabel}
Hash: ${tx.hash}
`.trim();

    await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        { chat_id: CHAT_ID, text, parse_mode: "Markdown" }
    );
}

export async function sendTelegramPumpAlert(data) {
    const text = `
🚀 *Pump Alert*
Token: ${data.symbol}
Score: ${data.hypeScore}
Price: $${data.price}
Liquidity: $${data.liquidity.toLocaleString()}
`.trim();

    await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        { chat_id: CHAT_ID, text, parse_mode: "Markdown" }
    );
}
