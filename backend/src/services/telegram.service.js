import axios from 'axios';

// 🔐 Feature flag
const TG_ENABLED = process.env.TELEGRAM_ENABLED === 'true';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export default async function postToTelegram(message) {
  // 🚫 Hard stop if disabled
  if (!TG_ENABLED) {
    console.log('🔕 Telegram posting disabled via env flag');
    return;
  }

  if (!BOT_TOKEN || !CHANNEL_ID) {
    console.error('❌ Telegram env vars missing');
    return;
  }

  try {
    await axios.post(TELEGRAM_API, {
      chat_id: CHANNEL_ID,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });

    console.log('📣 Telegram alert sent');
  } catch (err) {
    console.error(
      '❌ Telegram send error:',
      err?.response?.data || err.message
    );
  }
}
