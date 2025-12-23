import checkWhales from '../services/whale.service.js';
import analyzeWithAI from '../ai/interpreter.js';
import postToX from '../services/twitter.service.js';

export default async function runChaosJob() {
  const whaleEvent = await checkWhales();
  if (!whaleEvent) return;

  const aiInsight = await analyzeWithAI(whaleEvent);

  await postToX(aiInsight);
}
