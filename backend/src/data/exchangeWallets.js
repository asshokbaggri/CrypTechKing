// backend/src/data/exchangeWallets.js

export const EXCHANGE_WALLETS = {
  BINANCE: [
    '0x28c6c06298d514db089934071355e5743bf21d60',
    '0x21a31ee1afc51d94c2efccaa2092ad1028285549'
  ],
  COINBASE: [
    '0x71660c4005ba85c37ccec55d0c4493e66fe775d3'
  ],
  OKX: [
    '0x5a52e96bacdabb82fd05763e25335261b270efcb'
  ]
};

export function detectExchange(address = '') {
  for (const [name, wallets] of Object.entries(EXCHANGE_WALLETS)) {
    if (wallets.includes(address.toLowerCase())) {
      return name;
    }
  }
  return null;
}
