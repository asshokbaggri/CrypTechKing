import checkWhales from '../services/whale.service.js';

export default async function runChaosJob() {
  const whale = await checkWhales();

  if (!whale) {
    console.log('⏸ No significant whale activity');
    return;
  }

  console.log('🐋 Whale Detected:', whale);
}
