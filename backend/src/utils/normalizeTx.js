export function normalizeWhaleTx({ chain, tx, usdValue }) {
  return {
    chain,
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: Number(tx.value),
    usdValue: usdValue || null,
    blockNumber: tx.blockNumber || null,
    timestamp: tx.timestamp ? new Date(tx.timestamp * 1000) : new Date()
  };
}
