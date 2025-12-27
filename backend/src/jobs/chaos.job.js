import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';
import { formatWhaleTweet } from '../utils/formatTweet.js';

export default async function runChaosJob() {
  const whale = await checkWhales();

  if (!whale) {
    console.log('ℹ️ No significant whale activity');
    return;
  }

  console.log('🐳 Whale Detected:', whale);

  // ✅ FORMAT TWEET USING YOUR FORMATTER
  const tweetText = formatWhaleTweet(whale);

  // ✅ SEND TO X
  await postToX(tweetText);
}
