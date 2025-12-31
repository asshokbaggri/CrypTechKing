// backend/src/jobs/stablecoinMintBurn.job.js

import { Alchemy, Network } from 'alchemy-sdk'
import Alert from '../models/Alert.js'
import postToTelegram from '../services/telegram.service.js'

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(config)

// =======================
// CONFIG
// =======================
const TOKENS = {
  USDT: {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6
  },
  USDC: {
    address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6
  }
}

const TREASURY = {
  USDT: 'Tether Treasury',
  USDC: 'Circle Treasury'
}

const MIN_USD = 10_000_000

// =======================
// JOB
// =======================
export default async function runStablecoinMintBurn() {
  console.log('🟢 Scanning stablecoin Mint / Burn...')

  for (const [symbol, token] of Object.entries(TOKENS)) {
    const transfers = await alchemy.core.getAssetTransfers({
      fromBlock: 'latest',
      toBlock: 'latest',
      category: ['erc20'],
      contractAddresses: [token.address],
      excludeZeroValue: true
    })

    for (const tx of transfers.transfers) {
      const amount = Number(tx.value)
      const usdValue = amount

      if (usdValue < MIN_USD) continue

      const isMint = tx.from === '0x0000000000000000000000000000000000000000'
      const isBurn = tx.to === '0x0000000000000000000000000000000000000000'

      if (!isMint && !isBurn) continue

      const tier =
        usdValue >= 50_000_000
          ? 'ULTRA_WHALE'
          : usdValue >= 25_000_000
          ? 'MEGA_WHALE'
          : 'WHALE'

      const action = isMint ? 'Minted' : 'Burned'
      const insight = isMint
        ? 'Fresh liquidity entering the market 🟢'
        : 'Supply reduction detected 🔥'

      const message = `
${isMint ? '🟢' : '🔥'} <b>${tier.replace('_', ' ')}</b>

<b>${amount.toLocaleString()} ${symbol}</b>
💰 Value: <b>$${(usdValue / 1_000_000).toFixed(1)}M</b>

${action} at ${TREASURY[symbol]}
🧠 ${insight}

#${symbol} #StablecoinAlert
`.trim()

      await Alert.create({
        type: 'STABLECOIN',
        coin: symbol,
        amountToken: amount,
        usd: usdValue,
        blockchain: 'ethereum',
        tier,
        text: message,
        signalStrength: isMint ? 80 : 85
      })

      await postToTelegram(message)

      console.log(`✅ ${symbol} ${action} alert sent`)
    }
  }
}
