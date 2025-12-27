import 'dotenv/config';
import express from 'express';
import cron from 'node-cron';
import runChaosJob from './jobs/chaos.job.js';
import connectMongo from './config/mongo.js';

const app = express();
const PORT = process.env.PORT || 8080;

await connectMongo();

// Middleware
app.use(express.json());

// Routes
import alertRoutes from './routes/alert.routes.js';
app.use('/api', alertRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🚀 CrypTechKing backend running 👑');
});

// Start server
app.listen(PORT, () => {
  console.log(`👑 CrypTechKing backend live on port ${PORT}`);
});

// Cron job (UNCHANGED LOGIC)
cron.schedule('*/15 * * * *', async () => {
  console.log('🔥 CrypTechKing Chaos Scan running...');
  await runChaosJob();
});
