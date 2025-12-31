import dotenv from 'dotenv'
dotenv.config()

export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  TELEGRAM_ENABLED: process.env.TELEGRAM_ENABLED === 'true',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHANNEL_ID: process.env.TELEGRAM_CHANNEL_ID
}
