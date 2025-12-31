import app from './app.js'
import connectDB from './config/db.js'
import './config/env.js'

// Jobs
import startWhaleJob from './jobs/whale.job.js'
import startExchangeFlowJob from './jobs/exchangeFlow.job.js'
import startPriceAlertJob from './jobs/priceAlert.job.js'

const PORT = process.env.PORT || 3000

async function startServer() {
  await connectDB()

  startWhaleJob()
  startExchangeFlowJob()
  startPriceAlertJob()

  app.listen(PORT, () => {
    console.log(`🚀 CrypTechKing backend running on port ${PORT}`)
  })
}

startServer()
