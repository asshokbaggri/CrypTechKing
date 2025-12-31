import axios from 'axios'
import sendTelegramMessage from '../services/telegram.service.js'
import { log } from '../utils/logger.js'
import { isCooldown } from '../utils/cooldown.js'
import { WHALE_THRESHOLDS } from '../constants/thresholds.js'
import { detectExchange } from '../constants/exchanges.js'
import WhaleEvent from '../models/WhaleEvent.js'

const BTC_THRESHOLD = WHALE_THRESHOLDS.BTC

let lastProcessedHeight = null
let cachedPrice = null
let lastPriceFetch = 0

const http = axios.create({
  timeout: 15000,
  headers: {
    'User-Agent': 'CrypTechKing/1.0 (Telegram Whale Bot)'
  }
})

async function getBTCPrice() {
  const now = Date.now()
  if (cachedPrice && now - lastPriceFetch < 60_000) return cachedPrice

  const res = await http.get(
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
  )

  cachedPrice = Number(res.data.price)
  lastPriceFetch = now
  return cachedPrice
}

export default function startWhaleJob() {
  log('Whale job started (Mempool API)')

  setInterval(async () => {
    try {
      const btcPrice = await getBTCPrice()

      // 1️⃣ Latest block height
      const heightRes = await http.get(
        'https://mempool.space/api/blocks/tip/height'
      )
      const height = heightRes.data

      // 🔒 Process only NEW block
      if (height === lastProcessedHeight) return
      lastProcessedHeight = height

      // 2️⃣ Block hash
      const hashRes = await http.get(
        `https://mempool.space/api/block-height/${height}`
      )
      const blockHash = hashRes.data

      // 3️⃣ Block transactions
      const txRes = await http.get(
        `https://mempool.space/api/block/${blockHash}/txs`
      )
      const txs = txRes.data

      for (const tx of txs) {
        // HARD duplicate block
        const exists = await WhaleEvent.findOne({ txHash: tx.txid })
        if (exists) continue

        let totalOut = 0
        let maxOut = { value: 0, addr: null }
        let maxIn = { value: 0, addr: null }

        // TO
        for (const out of tx.vout) {
          totalOut += out.value
          if (out.value > maxOut.value && out.scriptpubkey_address) {
            maxOut = {
              value: out.value,
              addr: out.scriptpubkey_address
            }
          }
        }

        // FROM
        for (const vin of tx.vin) {
          if (
            vin.prevout &&
            vin.prevout.value > maxIn.value &&
            vin.prevout.scriptpubkey_address
          ) {
            maxIn = {
              value: vin.prevout.value,
              addr: vin.prevout.scriptpubkey_address
            }
          }
        }

        const btcAmount = totalOut / 100000000
        if (btcAmount < BTC_THRESHOLD) continue
        if (isCooldown(tx.txid, 3600)) continue

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

🔗 https://mempool.space/tx/${tx.txid}
⏱ Just mined
`

        await sendTelegramMessage(message)

        await WhaleEvent.create({
          chain: 'BTC',
          amount: btcAmount,
          from: fromExchange || 'unknown',
          to: toExchange || 'unknown',
          txHash: tx.txid
        })

        log(`🐳 BTC Whale SENT: ${btcAmount} BTC`)
      }
    } catch (err) {
      console.error('Whale job error:', err.message)
    }
  }, 120 * 1000) // ⏱ every 2 minutes (SAFE)
}
