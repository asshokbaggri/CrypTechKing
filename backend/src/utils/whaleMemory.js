const memory = {
  lastTxIds: new Set(),
  lastPostTime: 0,
  symbolCooldown: new Map()
};

export function canPostWhale(whale) {
  const now = Date.now();

  // ❌ Duplicate TX
  if (whale.txid && memory.lastTxIds.has(whale.txid)) {
    return { ok: false, reason: 'Duplicate txid' };
  }

  // ❌ Rate limit: 1 tweet / 10 min
  if (now - memory.lastPostTime < 10 * 60 * 1000) {
    return { ok: false, reason: 'Global cooldown active' };
  }

  // ❌ Symbol + chain cooldown (30 min)
  const key = `${whale.symbol}_${whale.blockchain}`;
  const last = memory.symbolCooldown.get(key) || 0;
  if (now - last < 30 * 60 * 1000) {
    return { ok: false, reason: 'Symbol cooldown active' };
  }

  // ✅ Allowed → update memory
  if (whale.txid) memory.lastTxIds.add(whale.txid);
  memory.lastPostTime = now;
  memory.symbolCooldown.set(key, now);

  // Keep memory clean
  if (memory.lastTxIds.size > 1000) {
    memory.lastTxIds.clear();
  }

  return { ok: true };
}
