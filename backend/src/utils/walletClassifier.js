// backend/src/utils/walletClassifier.js

import { detectExchange } from '../data/exchangeWallets.js';

export function classifyFlow(from, to) {
  const fromExchange = detectExchange(from);
  const toExchange = detectExchange(to);

  if (fromExchange && toExchange) {
    return {
      flowType: 'EXCHANGE_TO_EXCHANGE',
      confidence: 30
    };
  }

  if (!fromExchange && !toExchange) {
    return {
      flowType: 'WALLET_TO_WALLET',
      confidence: 20
    };
  }

  if (!fromExchange && toExchange) {
    return {
      flowType: 'WALLET_TO_EXCHANGE',
      confidence: 80
    };
  }

  if (fromExchange && !toExchange) {
    return {
      flowType: 'EXCHANGE_TO_WALLET',
      confidence: 75
    };
  }

  return {
    flowType: 'UNKNOWN',
    confidence: 10
  };
}
