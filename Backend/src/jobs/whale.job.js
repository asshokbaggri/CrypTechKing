import axios from 'axios'
import sendTelegramMessage from '../services/telegram.service.js'
import { log } from '../utils/logger.js'
import { isCooldown } from '../utils/cooldown.js'
import { WHALE_THRESHOLDS } from '../constants/thresholds.js'

const BTC_THRESHOLD = WHALE_THRESHOLDS.BTC

export default function startWhaleJob() {
  log('Whale job started')

  setInterval(async () => {
    try {
      // Get latest BTC block
      const latestBlock = await axios.get(
        'https://blockchain.info/latestblock'
      )

      const blockHash = latestBlock.data.hash

      const blockData = await axios.get(
        `https://blockchain.info/rawblock/${blockHash}`
      )

      const transactions = blockData.data.tx

      for (const tx of transactions) {
        let totalBTC = 0

        for (const out of tx.out) {
          totalBTC += out.value
        }

        const btcAmount = totalBTC / 100000000

        if (btcAmount >= BTC_THRESHOLD) {
          const cooldownKey = `btc-${tx.hash}`

          if (isCooldown(cooldownKey, 1800)) continue

          const message = `
🚨 <b>BTC WHALE ALERT</b> 🚨

🐳 <b>${btcAmount.toFixed(0)} BTC</b>
💰 ~$${(btcAmount * 43000).toLocaleString()}

🔗 Tx: ${tx.hash.slice(0, 12)}...
⏱ Just now
`

          await sendTelegramMessage(message)
          log(`🐳 BTC Whale detected: ${btcAmount} BTC`)
        }
      }
    } catch (err) {
      console.error('Whale job error:', err.message)
    }
  }, 60 * 1000) // every 1 minute
}
