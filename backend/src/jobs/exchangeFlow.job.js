// backend/src/jobs/exchangeFlow.job.js

import Alert from '../models/Alert.js'
import postToTelegram from '../services/telegram.service.js'

// =======================
// HELPERS
// =======================
function prettyUSD(n) {
  return `$${Number(n).toLocaleString()}`
}

function tierMeta(usd) {
  if (usd >= 50_000_000)
    return { tier: 'ULTRA_WHALE', emoji: '🔥🐳', label: 'ULTRA WHALE' }

  if (usd >= 25_000_000)
    return { tier: 'MEGA_WHALE', emoji: '🚨🐳', label: 'MEGA WHALE' }

  return { tier: 'WHALE', emoji: '🐳', label: 'WHALE ALERT' }
}

function narrative(flowType) {
  if (flowType === 'WALLET_TO_EXCHANGE')
    return 'Possible sell pressure building 👀'

  if (flowType === 'EXCHANGE_TO_WALLET')
    return 'Accumulation signal detected 🧠'

  return null
}

// =======================
// JOB
// =======================
export default async function runExchangeFlowJob() {
  console.log('🧠 Exchange Flow Scan running...')

  const alerts = await Alert.find({
    type: 'EXCHANGE_FLOW',
    telegramSent: { $ne: true }
  }).limit(10)

  for (const a of alerts) {
    // 🚫 NOISE KILLER
    if (
      a.flowType === 'WALLET_TO_WALLET' ||
      a.flowType === 'EXCHANGE_TO_EXCHANGE' ||
      a.signalStrength < 60 ||
      a.usd < 10_000_000
    ) {
      a.telegramSent = true
      await a.save()
      continue
    }

    const { tier, emoji, label } = tierMeta(a.usd)

    const tokenLine = a.amountToken
      ? `${Number(a.amountToken).toLocaleString()} ${a.coin}`
      : a.coin

    const flowLine =
      a.flowType === 'WALLET_TO_EXCHANGE'
        ? '📥 Wallet ➜ Exchange'
        : '📤 Exchange ➜ Wallet'

    const confidence =
      a.signalStrength >= 80
        ? 'High'
        : a.signalStrength >= 60
        ? 'Medium'
        : 'Low'

    const insight = narrative(a.flowType)

    const message = `
${emoji} <b>${label}</b>

<b>${tokenLine}</b>
💰 Value: <b>${prettyUSD(a.usd)}</b>

${flowLine}
📊 Confidence: <b>${confidence}</b>

${insight ? `🧠 ${insight}` : ''}

#${a.coin} #WhaleAlert
`.trim()

    await postToTelegram(message)

    a.telegramSent = true
    await a.save()

    console.log(`📣 Telegram sent → ${a.coin} ${prettyUSD(a.usd)}`)
  }
}
