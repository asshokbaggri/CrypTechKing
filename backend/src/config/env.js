import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  MONGO_URL: process.env.MONGO_URL,

  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHANNEL_ID: process.env.TELEGRAM_CHANNEL_ID,

  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET,

  ALCHEMY_ETH_HTTP: process.env.ALCHEMY_ETH_HTTP,
  ALCHEMY_ETH_WS: process.env.ALCHEMY_ETH_WS,
  ALCHEMY_POLYGON_HTTP: process.env.ALCHEMY_POLYGON_HTTP,
  ALCHEMY_POLYGON_WS: process.env.ALCHEMY_POLYGON_WS,

  BNB_HTTP: process.env.BNB_HTTP,
  BNB_WS: process.env.BNB_WS
};
