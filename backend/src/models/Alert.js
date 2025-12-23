import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  type: String,
  coin: String,
  usd: Number,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Alert', AlertSchema);
