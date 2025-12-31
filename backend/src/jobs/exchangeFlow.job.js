import Alert from '../models/Alert.js'
import postToTelegram from '../services/telegram.service.js'

// helper
function prettyUSD(n) {
  return `$${Number(n).toLocaleString()}`
}

function tierMeta(usd) {
  if (usd >= 50_000_000) return { tier: 'ULTRA_WHALE', emoji: '🔥🐳', label: 'ULTRA WHALE' }
  if (usd >= 25_000_000) return { tier: 'MEGA_WHALE', emoji: '🚨🐳', label: 'MEGA WHALE' }
  return { tier: 'WHALE', emoji: '🐳', label: 'WHALE ALERT' }
}

export default async function runExchangeFlowJob() {
  console.log('🧠 Exchange Flow Scan running...')

  const alerts = await Alert.find({
    type: 'EXCHANGE_FLOW',
    telegramSent: { $ne: true }
  }).limit(10)

  for (const a of alerts) {
    const { tier, emoji, label } = tierMeta(a.usd)

    const tokenAmount =
      a.amountToken
        ? `${Number(a.amountToken).toLocaleString()} ${a.coin}`
        : a.coin

    const flowLine =
      a.flowType === 'EXCHANGE_TO_EXCHANGE'
        ? '🏦 Exchange ➜ Exchange'
        : a.flowType === 'WALLET_TO_EXCHANGE'
        ? '📥 Wallet ➜ Exchange'
        : a.flowType === 'EXCHANGE_TO_WALLET'
        ? '📤 Exchange ➜ Wallet'
        : '🔄 Wallet ➜ Wallet'

    const confidence =
      a.signalStrength >= 70
        ? 'High'
        : a.signalStrength >= 40
        ? 'Medium'
        : 'Low'

    const message = `
${emoji} <b>${label}</b>

<b>${tokenAmount}</b>
💰 Value: <b>${prettyUSD(a.usd)}</b>

${flowLine}
📊 Confidence: <b>${confidence}</b>

#${a.coin} #WhaleAlert
`.trim()

    await postToTelegram(message)

    a.telegramSent = true
    await a.save()

    console.log(`📣 Telegram sent → ${a.coin} ${prettyUSD(a.usd)}`)
  }
}
