import mongoose from 'mongoose'

const whaleEventSchema = new mongoose.Schema({
  chain: String,
  amount: Number,
  from: String,
  to: String,
  txHash: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('WhaleEvent', whaleEventSchema)
