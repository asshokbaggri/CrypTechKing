import axios from 'axios';

const BASE_URL = 'https://api.whale-alert.io/v1/transactions';

export default async function checkWhales() {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        api_key: process.env.WHALE_ALERT_API_KEY,
        min_value: Number(process.env.WHALE_THRESHOLD) || 10_000_000,
        limit: 1
      }
    });

    const txs = res.data.transactions;
    if (!txs || txs.length === 0) return null;

    const tx = txs[0];

    return {
      type: 'WHALE_TRANSFER',
      blockchain: tx.blockchain,
      symbol: tx.symbol,
      amountUSD: tx.amount_usd,
      from: tx.from?.owner_type,
      to: tx.to?.owner_type,
      txid: tx.hash
    };
  } catch (err) {
    console.error('❌ Whale Alert API error:', err.message);
    return null;
  }
}
