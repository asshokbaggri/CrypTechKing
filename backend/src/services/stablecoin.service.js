// backend/src/services/stablecoin.service.js

import axios from 'axios';

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const TOKENS = {
  USDT: {
    symbol: 'USDT',
    contract: process.env.USDT_CONTRACT,
    treasury: process.env.USDT_TREASURY,
  },
  USDC: {
    symbol: 'USDC',
    contract: process.env.USDC_CONTRACT,
    treasury: process.env.USDC_TREASURY,
  },
};

export default async function fetchStablecoinTransfers() {
  try {
    const transfers = [];

    for (const tokenKey of Object.keys(TOKENS)) {
      const token = TOKENS[tokenKey];

      const res = await axios.post(ALCHEMY_URL, {
        jsonrpc: '2.0',
        id: 1,
        method: 'alchemy_getAssetTransfers',
        params: [{
          fromBlock: 'latest',
          toBlock: 'latest',
          contractAddresses: [token.contract],
          category: ['erc20'],
          withMetadata: true,
          excludeZeroValue: true,
          maxCount: '0x10',
        }],
      });

      const txs = res.data?.result?.transfers || [];

      for (const tx of txs) {
        transfers.push({
          token: token.symbol,
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          amount: Number(tx.value),
          timestamp: tx.metadata?.blockTimestamp,
        });
      }
    }

    return transfers;

  } catch (err) {
    console.error('❌ Stablecoin fetch error:', err.message);
    return [];
  }
}
