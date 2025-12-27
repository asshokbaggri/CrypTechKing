import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';
import { formatWhaleTweet } from '../utils/formatTweet.js';
import { canPostWhale } from '../utils/whaleMemory.js';

export default async function runChaosJob() {
  const whale = await checkWhales();

  if (!whale) {
    console.log('ℹ️ No significant whale activity');
    return;
  }

  // ❌ Ignore small transfers
  if (whale.amountUSD < 1_000_000) {
    console.log('🪙 Whale below $1M ignored');
    return;
  }

  // 🛡️ Anti-spam checks
  const permission = canPostWhale(whale);
  if (!permission.ok) {
    console.log(`⛔ Skip tweet: ${permission.reason}`);
    return;
  }

  console.log('🐳 Approved Whale:', whale);

  // 🧠 Format tweet (your smart formatter)
  let tweetText = formatWhaleTweet(whale);

  // 🚨 MEGA ALERT MODE
  if (whale.amountUSD >= 10_000_000) {
    tweetText =
      `🚨🚨 MEGA WHALE ALERT 🚨🚨\n\n` +
      tweetText +
      `\n\n👀 Institutions don’t move silently.`;
  }

  await postToX(tweetText);
}
