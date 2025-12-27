import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';

export default async function runChaosJob() {
  const whale = await checkWhales();
  if (!whale) {
    console.log('⏸ No significant whale activity');
    return;
  }

  console.log('🐋 Whale Detected:', whale);

  const tweet = `🚨 CrypTechKing Alert

${whale.symbol.toUpperCase()} whale transfer detected.
~$${(whale.amountUSD / 1e6).toFixed(1)}M moved.

Smart money doesn’t move randomly 👀`;

  await postToX(tweet);
}
