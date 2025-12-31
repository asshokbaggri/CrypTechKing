import axios from 'axios'
import sendTelegramMessage from '../services/telegram.service.js'
import { log } from '../utils/logger.js'
import { isCooldown } from '../utils/cooldown.js'
import { WHALE_THRESHOLDS } from '../constants/thresholds.js'
import { detectExchange } from '../constants/exchanges.js'
import WhaleEvent from '../models/WhaleEvent.js'

const BTC_THRESHOLD = WHALE_THRESHOLDS.BTC

const ALCHEMY_RPC =
  `${process.env.ALCHEMY_NETWORK}/${process.env.ALCHEMY_API_KEY}`

let lastProcessedBlock = null
let cachedPrice = null
let lastPriceFetch = 0

async function rpc(method, params = []) {
  const res = await axios.post(ALCHEMY_RPC, {
    jsonrpc: '2.0',
    id: 1,
    method,
    params
  })
  return res.data.result
}

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
  log('Whale job started (Alchemy BTC RPC)')

  setInterval(async () => {
    try {
      const btcPrice = await getBTCPrice()

      // 1️⃣ Latest block height
      const blockHeight = await rpc('getblockcount')

      if (blockHeight === lastProcessedBlock) return
      lastProcessedBlock = blockHeight

      // 2️⃣ Block hash
      const blockHash = await rpc('getblockhash', [blockHeight])

      // 3️⃣ Full block with tx data
      const block = await rpc('getblock', [blockHash, 2])

      for (const tx of block.tx) {
        // 🔒 DB duplicate protection
        const exists = await WhaleEvent.findOne({ txHash: tx.txid })
        if (exists) continue

        let totalOut = 0
        let maxOut = { value: 0, addr: null }
        let maxIn = { value: 0, addr: null }

        // TO (outputs)
        for (const vout of tx.vout) {
          const valueBTC = vout.value
          totalOut += valueBTC

          if (
            valueBTC > maxOut.value &&
            vout.scriptPubKey?.addresses?.[0]
          ) {
            maxOut = {
              value: valueBTC,
              addr: vout.scriptPubKey.addresses[0]
            }
          }
        }

        // FROM (inputs)
        for (const vin of tx.vin) {
          if (
            vin.prevout &&
            vin.prevout.value > maxIn.value &&
            vin.prevout.scriptPubKey?.addresses?.[0]
          ) {
            maxIn = {
              value: vin.prevout.value,
              addr: vin.prevout.scriptPubKey.addresses[0]
            }
          }
        }

        if (totalOut < BTC_THRESHOLD) continue
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

        const usdValue = (totalOut * btcPrice).toLocaleString()

        const message = `
🚨 <b>BTC WHALE ALERT</b> 🚨

🐳 <b>${totalOut.toFixed(0)} BTC</b>
💰 ~$${usdValue}

📤 From: ${fromExchange || 'Unknown Wallet'}
📥 To: ${toExchange || 'Unknown Wallet'}

${signal}

🧾 <b>Tx Hash (tap to copy)</b>
<code>${tx.txid}</code>

⏱ New block
`

        await sendTelegramMessage(message)

        await WhaleEvent.create({
          chain: 'BTC',
          amount: totalOut,
          from: fromExchange || 'unknown',
          to: toExchange || 'unknown',
          txHash: tx.txid
        })

        log(`🐳 BTC Whale SENT: ${totalOut} BTC`)
      }
    } catch (err) {
      console.error('Whale job error:', err.message)
    }
  }, 120 * 1000) // ⏱ 2 min (safe even for paid RPC)
}
