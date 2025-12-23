import 'dotenv/config';
import cron from 'node-cron';
import runChaosJob from './jobs/chaos.job.js';
import connectMongo from './config/mongo.js';
import http from 'http';

await connectMongo();

const PORT = process.env.PORT || 8080;

// Dummy server for Railway health
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('CrypTechKing backend running 👑');
}).listen(PORT, () => {
  console.log(`👑 CrypTechKing backend live on port ${PORT}`);
});

cron.schedule('*/15 * * * *', async () => {
  console.log('🔥 CrypTechKing Chaos Scan running...');
  await runChaosJob();
});
