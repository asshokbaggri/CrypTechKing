// backend/src/models/Alert.js

import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  type: String,

  coin: String,
  usd: Number,
  tier: String,

  text: String,

  // 🔍 NEW — Detail page fields
  blockchain: String,
  from: String,
  to: String,
  txid: String,

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Alert', AlertSchema);
