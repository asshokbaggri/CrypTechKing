import 'dotenv/config';
import express from 'express';
import http from 'http';
import cron from 'node-cron';
import runChaosJob from './jobs/chaos.job.js';
import connectMongo from './config/mongo.js';
import alertRoutes from './routes/alert.routes.js';

// 🔒 OPTIONAL (future)
// import runStablecoinJob from './jobs/stablecoin.job.js';

const app = express();

// 🔑 Railway-safe PORT handling
const PORT = Number(process.env.PORT) || 8080;

// =======================
// BOOTSTRAP
// =======================
(async () => {
  try {
    // DB connect
    await connectMongo();
    console.log('✅ MongoDB connected');

    // Middleware
    app.use(express.json());

    // Routes
    app.use('/api', alertRoutes);

    // Health check
    app.get('/', (req, res) => {
      res.send('🚀 CrypTechKing backend running 👑');
    });

    // 🔥 FORCE HTTP SERVER (Railway safe)
    const server = http.createServer(app);

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`👑 CrypTechKing backend live on port ${PORT}`);
    });

    // =======================
    // 🐳 WHALE ALERT CRON (KEEP AS IS)
    // =======================
    cron.schedule('*/15 * * * *', async () => {
      console.log('🔥 CrypTechKing Chaos Scan running...');
      try {
        await runChaosJob();
      } catch (err) {
        console.error('❌ Chaos job failed:', err.message);
      }
    });

    // =======================
    // 🪙 STABLECOIN (TEMP — MANUAL ONLY)
    // =======================
    // 🔴 DO NOT ENABLE CRON YET
    // Uncomment ONLY when testing Alchemy manually
    //
    // console.log('🧪 Running stablecoin test scan...');
    // await runStablecoinJob();

  } catch (err) {
    console.error('❌ Backend bootstrap failed:', err);
    process.exit(1);
  }
})();
