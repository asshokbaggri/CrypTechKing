// backend/src/utils/signalEngine.js

export function detectSignal(fromType, toType) {
  if (fromType === 'WALLET' && toType === 'EXCHANGE') {
    return {
      signal: 'SELL_PRESSURE',
      strength: 75
    };
  }

  if (fromType === 'EXCHANGE' && toType === 'WALLET') {
    return {
      signal: 'ACCUMULATION',
      strength: 80
    };
  }

  if (fromType === 'EXCHANGE' && toType === 'EXCHANGE') {
    return {
      signal: 'INTERNAL_TRANSFER',
      strength: 30
    };
  }

  if (fromType === 'MINT_BURN') {
    return {
      signal: 'SUPPLY_EVENT',
      strength: 85
    };
  }

  return {
    signal: 'UNKNOWN_FLOW',
    strength: 20
  };
}
