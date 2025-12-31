import axios from 'axios'
import sendTelegramMessage from '../services/telegram.service.js'
import { log } from '../utils/logger.js'
import { isCooldown } from '../utils/cooldown.js'
import { WHALE_THRESHOLDS } from '../constants/thresholds.js'
import { detectExchange } from '../constants/exchanges.js'
import WhaleEvent from '../models/WhaleEvent.js'

const BTC_THRESHOLD = WHALE_THRESHOLDS.BTC

let cachedPrice = null
let lastPriceFetch = 0

async function getBTCPrice() {
  const now = Date.now()
  if (cachedPrice && now - lastPriceFetch < 60_000) return cachedPrice

  const res = await axios.get(
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
  )

  cachedPrice = Number(res.data.price)
  lastPriceFetch = now
  return cachedPrice
}

export default function startWhaleJob() {
  log('Whale job started')

  setInterval(async () => {
    try {
      const btcPrice = await getBTCPrice()

      const latestBlock = await axios.get(
        'https://blockchain.info/latestblock'
      )

      const blockHash = latestBlock.data.hash
      const blockData = await axios.get(
        `https://blockchain.info/rawblock/${blockHash}`
      )

      for (const tx of blockData.data.tx) {
        // 🔒 Hard duplicate block
        const exists = await WhaleEvent.findOne({ txHash: tx.hash })
        if (exists) continue

        let totalOut = 0
        let maxOut = { value: 0, addr: null }
        let maxIn = { value: 0, addr: null }

        // TO (outputs)
        for (const out of tx.out) {
          totalOut += out.value
          if (out.value > maxOut.value && out.addr) {
            maxOut = out
          }
        }

        // FROM (inputs)
        for (const input of tx.inputs) {
          if (
            input.prev_out &&
            input.prev_out.value > maxIn.value &&
            input.prev_out.addr
          ) {
            maxIn = input.prev_out
          }
        }

        const btcAmount = totalOut / 100000000
        if (btcAmount < BTC_THRESHOLD) continue

        if (isCooldown(tx.hash, 1800)) continue

        const fromExchange = maxIn.addr
          ? detectExchange(maxIn.addr)
          : null
        const toExchange = maxOut.addr
          ? detectExchange(maxOut.addr)
          : null

        let signal = '🟡 Neutral transfer'
        if (toExchange && !fromExchange)
          signal = '⚠️ Possible SELL pressure'
        if (!toExchange && fromExchange)
          signal = '📈 Accumulation move'

        const usdValue = (btcAmount * btcPrice).toLocaleString()

        const message = `
🚨 <b>BTC WHALE ALERT</b> 🚨

🐳 <b>${btcAmount.toFixed(0)} BTC</b>
💰 ~$${usdValue}

📤 From: ${fromExchange || 'Unknown Wallet'}
📥 To: ${toExchange || 'Unknown Wallet'}

${signal}

🔗 https://www.blockchain.com/btc/tx/${tx.hash}
⏱ Just now
`

        await sendTelegramMessage(message)

        await WhaleEvent.create({
          chain: 'BTC',
          amount: btcAmount,
          from: fromExchange || 'unknown',
          to: toExchange || 'unknown',
          txHash: tx.hash
        })

        log(`🐳 BTC Whale SENT: ${btcAmount} BTC`)
      }
    } catch (err) {
      console.error('Whale job error:', err.message)
    }
  }, 60 * 1000)
}
