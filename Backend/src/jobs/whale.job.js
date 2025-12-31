import axios from 'axios'
import sendTelegramMessage from '../services/telegram.service.js'
import { log } from '../utils/logger.js'
import { isCooldown } from '../utils/cooldown.js'
import { WHALE_THRESHOLDS } from '../constants/thresholds.js'
import { detectExchange } from '../constants/exchanges.js'

const BTC_THRESHOLD = WHALE_THRESHOLDS.BTC

export default function startWhaleJob() {
  log('Whale job started')

  setInterval(async () => {
    try {
      const latestBlock = await axios.get('https://blockchain.info/latestblock')
      const blockHash = latestBlock.data.hash
      const blockData = await axios.get(
        `https://blockchain.info/rawblock/${blockHash}`
      )

      for (const tx of blockData.data.tx) {
        let totalBTC = 0
        let toAddress = null

        for (const out of tx.out) {
          totalBTC += out.value
          if (!toAddress && out.addr) toAddress = out.addr
        }

        const btcAmount = totalBTC / 100000000
        if (btcAmount < BTC_THRESHOLD) continue

        if (isCooldown(tx.hash, 1800)) continue

        const exchange = toAddress ? detectExchange(toAddress) : null

        let signal = '🟡 Neutral transfer'
        if (exchange) signal = '⚠️ Possible SELL pressure'

        const message = `
🚨 <b>BTC WHALE ALERT</b> 🚨

🐳 <b>${btcAmount.toFixed(0)} BTC</b>
💰 ~$${(btcAmount * 43000).toLocaleString()}

📥 To: ${exchange || 'Unknown Wallet'}
${signal}

🔗 Tx: ${tx.hash.slice(0, 12)}...
⏱ Just now
`

        await sendTelegramMessage(message)
        log(`🐳 BTC Whale classified: ${btcAmount} BTC`)
      }
    } catch (err) {
      console.error('Whale job error:', err.message)
    }
  }, 60 * 1000)
}
