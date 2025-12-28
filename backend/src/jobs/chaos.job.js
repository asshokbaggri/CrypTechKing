import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';
import { formatWhaleTweet } from '../utils/formatTweet.js';
import { canPostWhale } from '../utils/whaleMemory.js';
import Alert from '../models/Alert.js';

const ULTRA_X_THRESHOLD = 50_000_000; // 🔥 X ONLY

export default async function runChaosJob() {
  const whale = await checkWhales();

  if (!whale) {
    console.log('ℹ️ No significant whale activity');
    return;
  }

  // ❌ Ignore small transfers
  if (whale.amountUSD < 10_000_000) {
    console.log('🪙 Whale below $10M ignored');
    return;
  }

  // 🛡️ Anti-spam memory
  const permission = canPostWhale(whale);
  if (!permission.ok) {
    console.log(`⛔ Skip whale: ${permission.reason}`);
    return;
  }

  console.log('🐳 Approved WHALE:', whale);

  // 🧠 Format alert text
  let alertText = formatWhaleTweet(whale);

  // 🚨 ULTRA formatting
  if (whale.amountUSD >= ULTRA_X_THRESHOLD) {
    alertText =
      `🚨🚨 ULTRA WHALE ALERT 🚨🚨\n\n` +
      alertText +
      `\n\n👀 Institutions don’t move silently.`;
  }

  // 💾 Save to Mongo (ALWAYS)
  await Alert.create({
    type: whale.type || 'WHALE_TRANSFER',
    coin: whale.symbol.toUpperCase(),
    usd: whale.amountUSD,
    text: alertText,
  });

  console.log('💾 Alert saved to MongoDB');

  // 🐦 X POST — ULTRA ONLY
  if (whale.amountUSD >= ULTRA_X_THRESHOLD) {
    console.log('🐦 Posting ULTRA whale to X');
    await postToX(alertText);
  } else {
    console.log('🛑 X skipped (not ULTRA)');
  }
}
