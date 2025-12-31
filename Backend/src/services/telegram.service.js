import axios from 'axios'
import { ENV } from '../config/env.js'

export default async function sendTelegramMessage(text) {
  if (!ENV.TELEGRAM_ENABLED) return

  const url = `https://api.telegram.org/bot${ENV.TELEGRAM_BOT_TOKEN}/sendMessage`

  try {
    await axios.post(url, {
      chat_id: ENV.TELEGRAM_CHANNEL_ID,
      text,
      parse_mode: 'HTML'
    })
  } catch (err) {
    console.error('Telegram error:', err.message)
  }
}
