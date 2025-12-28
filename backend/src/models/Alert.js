// backend/src/models/Alert.js

import mongoose from 'mongoose';

/**
 * Phase 6.1 principles:
 * - NEVER break old alerts
 * - All new intelligence fields OPTIONAL
 * - Frontend-safe (undefined-proof)
 */

const AlertSchema = new mongoose.Schema({
  // Core
  type: { type: String },

  coin: { type: String },
  usd: { type: Number },
  tier: { type: String },

  text: { type: String },

  // 🔍 Blockchain intelligence (Phase 6.1)
  blockchain: { type: String },

  // Human-readable labels
  from: { type: String },   // Binance / Treasury / Unknown
  to: { type: String },

  txid: { type: String },

  // 🧠 NEW — token intelligence (SAFE ADD)
  amountToken: { type: Number, default: null }, // BTC / ETH / XRP count
  tokenSymbol: { type: String },                // BTC / ETH / XRP

  createdAt: { type: Date, default: Date.now }
});

/**
 * Prevent model overwrite in hot reloads
 */
export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
