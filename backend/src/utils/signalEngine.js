// backend/src/utils/signalEngine.js

export function shouldSendSignal({
  usd,
  confidence,
  flowType,
  symbol
}) {
  const TOP_TOKENS = ['BTC', 'ETH', 'USDT', 'USDC', 'SHIB'];

  if (!TOP_TOKENS.includes(symbol)) return false;
  if (usd < 10_000_000) return false;
  if (confidence < 60) return false;

  if (flowType === 'WALLET_TO_WALLET') return false;
  if (flowType === 'EXCHANGE_TO_EXCHANGE') return false;

  return true;
}

export function buildNarrative(flowType) {
  if (flowType === 'WALLET_TO_EXCHANGE')
    return 'Possible sell pressure building 👀';

  if (flowType === 'EXCHANGE_TO_WALLET')
    return 'Accumulation signal detected 🧠';

  return 'Unusual large movement detected';
}
