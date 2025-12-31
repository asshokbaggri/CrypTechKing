import mongoose from 'mongoose'

const exchangeFlowSchema = new mongoose.Schema({
  exchange: String,
  direction: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('ExchangeFlow', exchangeFlowSchema)
