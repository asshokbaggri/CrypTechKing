export const EXCHANGE_WALLETS = {
  BINANCE: [
    '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
    'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  ],
  COINBASE: [
    'bc1ql4u0x0k6j5qz9x9u4qv9zq2x5l0w9s7q9k3n4'
  ]
}

export function detectExchange(address) {
  for (const [exchange, wallets] of Object.entries(EXCHANGE_WALLETS)) {
    if (wallets.includes(address)) return exchange
  }
  return null
}
