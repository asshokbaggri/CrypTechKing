// backend/src/services/whale.service.js

import axios from 'axios';

const BASE_URL = 'https://api.whale-alert.io/v1/transactions';

/**
 * Phase 6.1 goals:
 * - Token amount (exact coin quantity)
 * - Human-readable from/to labels (exchange / treasury / unknown)
 * - Keep old fields intact (backward compatible)
 * - NO frontend dependency
 */
export default async function checkWhales() {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        api_key: process.env.WHALE_ALERT_API_KEY,
        min_value: Number(process.env.WHALE_THRESHOLD) || 10_000_000,
        limit: 1
      }
    });

    const txs = res.data?.transactions;
    if (!txs || txs.length === 0) return null;

    const tx = txs[0];

    // 🧠 Normalize from/to labels (safe)
    const normalizeParty = (side) => {
      if (!side) return 'unknown';

      // Prefer exact owner name if available
      if (side.owner) return side.owner;

      // Fallback to owner_type (exchange / unknown / treasury)
      if (side.owner_type) return side.owner_type;

      return 'unknown';
    };

    return {
      // ---- existing fields (DO NOT BREAK) ----
      type: 'WHALE_TRANSFER',
      blockchain: tx.blockchain,
      symbol: tx.symbol,
      amountUSD: tx.amount_usd,
      from: normalizeParty(tx.from),
      to: normalizeParty(tx.to),
      txid: tx.hash,

      // ---- NEW Phase 6.1 fields (SAFE ADDITIONS) ----
      amountToken: typeof tx.amount === 'number' ? tx.amount : null,
      tokenSymbol: tx.symbol
    };
  } catch (err) {
    console.error('❌ Whale Alert API error:', err.message);
    return null;
  }
}
