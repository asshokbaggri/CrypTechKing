import 'dotenv/config'
import express from 'express'
import http from 'http'
import cron from 'node-cron'

import connectMongo from './config/mongo.js'
import alertRoutes from './routes/alert.routes.js'

import runChaosJob from './jobs/chaos.job.js'
import runStablecoinMintBurn from './jobs/stablecoinMintBurn.job.js'
import runExchangeFlowJob from './jobs/exchangeFlow.job.js';

const app = express()

const PORT = Number(process.env.PORT) || 8080

// =======================
// DB
// =======================
await connectMongo()

// =======================
// Middleware
// =======================
app.use(express.json())

// =======================
// Routes
// =======================
app.use('/api', alertRoutes)

// Health
app.get('/', (req, res) => {
  res.send('🚀 CrypTechKing backend running 👑')
})

// =======================
// Server
// =======================
const server = http.createServer(app)

server.listen(PORT, '0.0.0.0', () => {
  console.log(`👑 CrypTechKing backend live on port ${PORT}`)
})

// =======================
// CRON JOBS
// =======================

// Whale transfers / chaos scan
cron.schedule('*/15 * * * *', async () => {
  console.log('🔥 Chaos whale scan running...')
  await runChaosJob()
})

// Stablecoin mint / burn (VERY IMPORTANT)
cron.schedule('*/10 * * * *', async () => {
  console.log('🟢 Stablecoin mint/burn scan running...')
  await runStablecoinMintBurn()
})

// Exchange Flow 
cron.schedule('*/10 * * * *', async () => {
  console.log('🧠 Exchange Flow Intelligence Scan...');
  await runExchangeFlowJob();
});
