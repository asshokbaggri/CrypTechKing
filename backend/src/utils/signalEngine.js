// backend/src/utils/signalEngine.js

export function detectSignal(fromType, toType) {
  // Wallet ➜ Exchange (Sell pressure)
  if (fromType === 'WALLET' && toType === 'EXCHANGE') {
    return {
      signal: 'SELL_PRESSURE',
      flowType: 'WALLET_TO_EXCHANGE',
      strength: 75
    };
  }

  // Exchange ➜ Wallet (Accumulation)
  if (fromType === 'EXCHANGE' && toType === 'WALLET') {
    return {
      signal: 'ACCUMULATION',
      flowType: 'EXCHANGE_TO_WALLET',
      strength: 80
    };
  }

  // Mint / Burn events
  if (fromType === 'MINT_BURN' || toType === 'MINT_BURN') {
    return {
      signal: 'SUPPLY_EVENT',
      flowType: 'SUPPLY_CHANGE',
      strength: 85
    };
  }

  // Exchange ➜ Exchange = noise
  if (fromType === 'EXCHANGE' && toType === 'EXCHANGE') {
    return null; // ❌ IGNORE
  }

  return {
    signal: 'UNKNOWN_FLOW',
    flowType: 'UNKNOWN',
    strength: 20
  };
}
