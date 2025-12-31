// backend/src/utils/walletClassifier.js

import { EXCHANGE_WALLETS } from '../data/exchangeWallets.js';

export function classifyWallet(address) {
  if (!address) return 'UNKNOWN';

  const lower = address.toLowerCase();

  if (lower === '0x0000000000000000000000000000000000000000') {
    return 'MINT_BURN';
  }

  for (const wallets of Object.values(EXCHANGE_WALLETS)) {
    if (wallets.map(w => w.toLowerCase()).includes(lower)) {
      return 'EXCHANGE';
    }
  }

  return 'WALLET';
}
