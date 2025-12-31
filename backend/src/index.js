import 'dotenv/config'
import express from 'express'
import http from 'http'
import cron from 'node-cron'

import runChaosJob from './jobs/chaos.job.js'
import runStablecoinMintBurn from './jobs/stablecoinMintBurn.job.js' // ✅ ADD

import connectMongo from './config/mongo.js'
import alertRoutes from './routes/alert.routes.js'

const app = express()

// 🔑 PORT (Railway safe)
const PORT = Number(process.env.PORT) || 8080

// DB connect
await connectMongo()

// Middleware
app.use(express.json())

// Routes
app.use('/api', alertRoutes)

// Health check
app.get('/', (req, res) => {
  res.send('🚀 CrypTechKing backend running 👑')
})

// 🔥 HTTP SERVER
const server = http.createServer(app)

// 🔥 BIND
server.listen(PORT, '0.0.0.0', () => {
  console.log(`👑 CrypTechKing backend live on port ${PORT}`)
})

/* ======================================================
   CRON JOBS
   ====================================================== */

// 🐳 Regular Whale Transfers (existing)
cron.schedule('*/15 * * * *', async () => {
  console.log('🐳 Chaos whale scan running...')
  await runChaosJob()
})

// 🪙 Stablecoin Mint / Burn / Treasury (REAL ALPHA)
cron.schedule('*/5 * * * *', async () => {
  console.log('🪙 Stablecoin mint/burn scan running...')
  await runStablecoinMintBurn()
})
