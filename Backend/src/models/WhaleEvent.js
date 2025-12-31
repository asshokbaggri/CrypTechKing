import mongoose from 'mongoose'

const whaleEventSchema = new mongoose.Schema({
  chain: String,
  amount: Number,
  from: String,
  to: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('WhaleEvent', whaleEventSchema)
