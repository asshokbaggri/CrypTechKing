// backend/src/models/Alert.js

import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  type: String,

  coin: String,
  usd: Number,
  amountToken: Number,
  tier: String,

  text: String,

  blockchain: String,
  from: String,
  to: String,
  txid: String,

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Alert', AlertSchema);
