// backend/src/jobs/stablecoinMintBurn.job.js

import { Alchemy, Network, Utils } from 'alchemy-sdk';
import Alert from '../models/alert.model.js';

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(config);

// Stablecoin contracts
const TOKENS = {
  USDT: {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6
  },
  USDC: {
    address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6
  }
};

// Known treasury wallets
const TREASURY = {
  USDT: 'Tether Treasury',
  USDC: 'Circle Treasury'
};

// Thresholds (USD)
const MIN_USD = 10_000_000;

export default async function runStablecoinMintBurn() {
  console.log('🟢 Scanning stablecoin Mint / Burn...');

  for (const [symbol, token] of Object.entries(TOKENS)) {
    const transfers = await alchemy.core.getAssetTransfers({
      fromBlock: 'latest',
      toBlock: 'latest',
      category: ['erc20'],
      contractAddresses: [token.address],
      withMetadata: true,
      excludeZeroValue: true
    });

    for (const tx of transfers.transfers) {
      const amount = Number(tx.value);
      const usdValue = amount; // stablecoins ≈ USD

      if (usdValue < MIN_USD) continue;

      const isMint = tx.from === '0x0000000000000000000000000000000000000000';
      const isBurn = tx.to === '0x0000000000000000000000000000000000000000';

      if (!isMint && !isBurn) continue;

      const tier =
        usdValue >= 50_000_000
          ? 'ULTRA_WHALE'
          : usdValue >= 25_000_000
          ? 'MEGA_WHALE'
          : 'WHALE';

      const action = isMint ? 'Minted' : 'Burned';

      const text = `
${isMint ? '🟢' : '🔥'} ${tier.replace('_', ' ')} ALERT

${amount.toLocaleString()} ${symbol} ($${(usdValue / 1_000_000).toFixed(1)}M)
${action} at ${TREASURY[symbol]}

${isMint ? 'Fresh liquidity entering market' : 'Supply reduction detected'}

#Crypto #WhaleAlert #${symbol}
`.trim();

      await Alert.create({
        coin: symbol,
        amountToken: amount,
        usd: usdValue,
        from: isMint ? 'Mint' : 'Treasury',
        to: isBurn ? 'Burn' : 'Treasury',
        blockchain: 'ethereum',
        tier,
        text,
        signalStrength: isMint ? 70 : 75
      });

      console.log(`✅ ${symbol} ${action} alert saved`);
    }
  }
}
