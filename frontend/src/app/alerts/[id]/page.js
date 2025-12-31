import { notFound } from 'next/navigation'
import XIcon from '@/components/icons/XIcon'
import AlertHeader from '@/components/AlertHeader'

// ---------- DATA ----------
async function getAlert(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/alerts/${id}`,
    { cache: 'no-store' }
  )

  if (!res.ok) return null
  return res.json()
}

// ---------- HELPERS ----------
function formatWallet(label) {
  if (!label) return 'Unknown wallet'
  if (label.toLowerCase() === 'unknown') return 'Unknown wallet'
  return label
}

function formatXShare(alert, detailUrl) {
  const usd = Number(alert.usd || 0)
  const coin = alert.coin?.toUpperCase() || 'TOKEN'
  const chain = alert.blockchain?.toUpperCase() || 'BLOCKCHAIN'

  const isUltra = usd >= 50_000_000
  const isMega = usd >= 25_000_000 && usd < 50_000_000

  const header = isUltra
    ? '🔥 ULTRA WHALE ALERT'
    : isMega
    ? '🚨 MEGA WHALE ALERT'
    : '🐳 WHALE ALERT'

  const amountLine = alert.amountToken
    ? `${Number(alert.amountToken).toLocaleString()} ${coin} ($${usd.toLocaleString()})`
    : `$${usd.toLocaleString()}`

  return `
${header}

${amountLine}
moved on ${chain}

From: ${formatWallet(alert.from)}
To: ${formatWallet(alert.to)}

🔍 Full details:
${detailUrl}
`.trim()
}

// ---------- PAGE ----------
export default async function AlertDetail({ params }) {
  const res = await getAlert(params.id)
  const alert = res?.data

  if (!alert) return notFound()

  const explorerMap = {
    ethereum: `https://etherscan.io/tx/${alert.txid}`,
    tron: `https://tronscan.org/#/transaction/${alert.txid}`,
    bitcoin: `https://www.blockchain.com/btc/tx/${alert.txid}`,
    ripple: `https://livenet.xrpl.org/transactions/${alert.txid}`
  }

  const explorerUrl = explorerMap[alert.blockchain]
  const detailUrl = `https://cryptechking.vercel.app/alerts/${alert._id}`
  const xText = formatXShare(alert, detailUrl)

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">

      {/* HEADER */}
      <AlertHeader
        coin={alert.coin}
        usd={alert.usd}
        tier={alert.tier}
      />

      {/* TRANSFER FLOW */}
      <div className="rounded-xl border border-gray-700 p-4 mb-6 text-center">
        <p className="text-sm text-gray-400">Transfer Flow</p>
        <p className="text-lg mt-1 font-medium">
          {formatWallet(alert.from)} → {formatWallet(alert.to)}
        </p>
        <p className="text-xs uppercase tracking-wide text-gray-500 mt-1">
          {alert.blockchain}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border border-gray-700 p-4">
          <p className="text-xs text-gray-400">USD Value</p>
          <p className="text-lg font-semibold">
            ${Number(alert.usd).toLocaleString()}
          </p>
        </div>

        {alert.amountToken && (
          <div className="rounded-lg border border-gray-700 p-4">
            <p className="text-xs text-gray-400">Token Amount</p>
            <p className="text-lg font-semibold">
              {Number(alert.amountToken).toLocaleString()} {alert.coin}
            </p>
          </div>
        )}

        <div className="rounded-lg border border-gray-700 p-4">
          <p className="text-xs text-gray-400">Tier</p>
          <p className="font-medium">{alert.tier}</p>
        </div>

        <div className="rounded-lg border border-gray-700 p-4">
          <p className="text-xs text-gray-400">Time</p>
          <p className="text-sm">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* SIGNAL */}
      <div className="rounded-lg border border-gray-700 p-4 mb-6">
        <p className="text-xs text-gray-400">Flow Insight (Beta)</p>
        <p className="font-medium mt-1">
          Neutral transfer detected ({alert.signalStrength || 0}%)
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between gap-4">
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            View on Blockchain Explorer ↗
          </a>
        )}

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            xText
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300"
        >
          <XIcon size={14} />
          Share
        </a>
      </div>

      {/* TELEGRAM CTA */}
      <div className="mt-8 text-center text-sm text-gray-500">
        🔔 Get instant whale alerts on Telegram
        <br />
        <a
          href="https://t.me/CrypTechKingAlpha"
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          Join CrypTechKing Alpha
        </a>
      </div>

    </main>
  )
}
