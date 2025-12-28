import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';
import { formatWhaleTweet } from '../utils/formatTweet.js';
import { canPostWhale } from '../utils/whaleMemory.js';
import Alert from '../models/Alert.js';

const MIN_WHALE_USD = 10_000_000;
const ULTRA_WHALE_USD = 50_000_000;

export default async function runChaosJob() {
  const whale = await checkWhales();

  if (!whale) {
    console.log('ℹ️ No significant whale activity');
    return;
  }

  // ❌ HARD FILTER
  if (whale.amountUSD < MIN_WHALE_USD) {
    console.log('🪙 Whale below threshold ignored');
    return;
  }

  // 🛡️ Anti-spam memory
  const permission = canPostWhale(whale);
  if (!permission.ok) {
    console.log(`⛔ Skip whale: ${permission.reason}`);
    return;
  }

  // 🧠 Tier detection
  let tier = 'WHALE';
  if (whale.amountUSD >= ULTRA_WHALE_USD) tier = 'ULTRA_WHALE';
  else if (whale.amountUSD >= 25_000_000) tier = 'MEGA_WHALE';

  console.log(`🐳 Approved ${tier}:`, whale);

  // 🧠 Format text
  let text = formatWhaleTweet(whale, tier);

  if (tier === 'MEGA_WHALE') {
    text =
      `🚨🚨 MEGA WHALE ALERT 🚨🚨\n\n` +
      text +
      `\n\n👀 Institutions don’t move silently.`;
  }

  if (tier === 'ULTRA_WHALE') {
    text =
      `🔥🔥 ULTRA WHALE ALERT 🔥🔥\n\n` +
      text +
      `\n\n🚀 Market-moving transfer detected.`;
  }

  // 💾 ALWAYS save to DB
  await Alert.create({
    type: whale.type || 'WHALE_TRANSFER',
    coin: whale.symbol.toUpperCase(),
    usd: whale.amountUSD,
    text,
    tier
  });

  console.log('💾 Alert saved to MongoDB');

  // 🐦 X = ULTRA ONLY
  if (tier === 'ULTRA_WHALE') {
    console.log('🐦 Posting ULTRA whale to X');
    await postToX(text);
  } else {
    console.log('🛑 X skipped (not ULTRA)');
  }
}
