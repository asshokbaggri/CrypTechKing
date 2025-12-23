import checkWhales from '../services/whale.service.js';
import checkVolumeSpike from '../services/volume.service.js';
import analyzeWithAI from '../ai/interpreter.js';
import postToX from '../services/twitter.service.js';

export default async function runChaosJob() {
  const whale = await checkWhales();
  const volume = await checkVolumeSpike();

  const event = whale || volume;
  if (!event) return;

  const insight = await analyzeWithAI(event);
  await postToX(insight);
}
