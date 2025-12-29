import axios from 'axios';

const TG_ENABLED = process.env.TELEGRAM_ENABLED === 'true';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export default async function postToTelegram(message) {
  if (!TG_ENABLED) {
    console.log('🔕 Telegram disabled');
    return;
  }

  if (!BOT_TOKEN || !CHANNEL_ID) {
    console.error('❌ Telegram env missing');
    return;
  }

  console.log('📣 Sending Telegram message...');

  try {
    const res = await axios.post(TELEGRAM_API, {
      chat_id: CHANNEL_ID,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });

    console.log('✅ Telegram sent:', res.data?.ok);
  } catch (err) {
    console.error(
      '❌ Telegram error:',
      err?.response?.data || err.message
    );
  }
}
