import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';
import { formatWhaleTweet } from '../utils/formatTweet.js';
import { canPostWhale } from '../utils/whaleMemory.js';
import Alert from '../models/Alert.js';

const MIN_WHALE_USD = 10_000_000;

export default async function runChaosJob() {
  const whale = await checkWhales();

  if (!whale) {
    console.log('ℹ️ No significant whale activity');
    return;
  }

  // ❌ HARD FILTER — NO SMALL WHALES
  if (whale.amountUSD < MIN_WHALE_USD) {
    console.log(`🪙 Whale below $${MIN_WHALE_USD / 1_000_000}M ignored`);
    return;
  }

  // 🛡️ Anti-spam
  const permission = canPostWhale(whale);
  if (!permission.ok) {
    console.log(`⛔ Skip whale: ${permission.reason}`);
    return;
  }

  // 🧠 Tier detection
  let tier = 'WHALE';
  if (whale.amountUSD >= 50_000_000) tier = 'ULTRA_WHALE';
  else if (whale.amountUSD >= 25_000_000) tier = 'MEGA_WHALE';

  console.log(`🐳 Approved ${tier}:`, whale);

  // 🧠 Tweet formatting
  let tweetText = formatWhaleTweet(whale, tier);

  if (tier === 'MEGA_WHALE') {
    tweetText =
      `🚨🚨 MEGA WHALE ALERT 🚨🚨\n\n` +
      tweetText +
      `\n\n👀 Institutions don’t move silently.`;
  }

  if (tier === 'ULTRA_WHALE') {
    tweetText =
      `🔥🔥 ULTRA WHALE ALERT 🔥🔥\n\n` +
      tweetText +
      `\n\n🚀 Market-moving transfer detected.`;
  }

  // 💾 Save to DB
  await Alert.create({
    type: whale.type || 'WHALE_TRANSFER',
    coin: whale.symbol.toUpperCase(),
    usd: whale.amountUSD,
    text: tweetText,
    tier
  });

  console.log('💾 Alert saved to MongoDB');

  // 🐦 Post to X
  await postToX(tweetText);
}
