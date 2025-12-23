import 'dotenv/config';
import cron from 'node-cron';
import runChaosJob from './jobs/chaos.job.js';

const PORT = process.env.PORT || 8080;

cron.schedule('*/15 * * * *', async () => {
  console.log('👑 CrypTechKing Chaos Scan running...');
  await runChaosJob();
});

console.log(`👑 CrypTechKing backend live on port ${PORT}`);
