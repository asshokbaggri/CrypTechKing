import axios from 'axios';

export default async function checkWhales() {
  // placeholder — later Whale Alert API plug-in
  const mockWhale = {
    coin: 'ETH',
    amountUSD: 38600000,
    to: 'Binance'
  };

  if (mockWhale.amountUSD > Number(process.env.WHALE_THRESHOLD)) {
    return mockWhale;
  }

  return null;
}
