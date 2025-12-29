import mongoose from 'mongoose';

/**
 * Phase 7.1 principles:
 * - NEVER break old alerts
 * - All intelligence fields OPTIONAL
 * - Frontend-safe
 */

const AlertSchema = new mongoose.Schema({
  // Core
  type: { type: String },

  coin: { type: String },
  usd: { type: Number },
  tier: { type: String },

  text: { type: String },

  // Blockchain context
  blockchain: { type: String },
  from: { type: String },
  to: { type: String },
  txid: { type: String },

  // Token intelligence
  amountToken: { type: Number, default: null },
  tokenSymbol: { type: String },

  // 🧠 Phase 7.1 — SIGNAL INTELLIGENCE
  signal: {
    type: String,
    enum: [
      'ACCUMULATION',
      'EXCHANGE_INFLOW',
      'EXCHANGE_TO_EXCHANGE',
      'UNKNOWN_FLOW'
    ],
    default: 'UNKNOWN_FLOW'
  },

  flowType: {
    type: String,
    enum: [
      'WALLET_TO_EXCHANGE',
      'EXCHANGE_TO_WALLET',
      'EXCHANGE_TO_EXCHANGE',
      'UNKNOWN'
    ],
    default: 'UNKNOWN'
  },

  signalStrength: {
    type: Number, // 0–100
    default: 0
  },

  createdAt: { type: Date, default: Date.now }
});

/**
 * Prevent model overwrite in hot reloads
 */
export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
