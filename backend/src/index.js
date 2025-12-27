import 'dotenv/config';
import express from 'express';
import http from 'http';
import cron from 'node-cron';
import runChaosJob from './jobs/chaos.job.js';
import connectMongo from './config/mongo.js';
import alertRoutes from './routes/alert.routes.js';

const app = express();

// 🔑 IMPORTANT: force number + fallback
const PORT = Number(process.env.PORT) || 8080;

// DB connect
await connectMongo();

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

// 🔥 FORCE bind on all interfaces
server.listen(PORT, '0.0.0.0', () => {
  console.log(`👑 CrypTechKing backend live on port ${PORT}`);
});

// Cron job (UNCHANGED LOGIC)
cron.schedule('*/15 * * * *', async () => {
  console.log('🔥 CrypTechKing Chaos Scan running...');
  await runChaosJob();
});
