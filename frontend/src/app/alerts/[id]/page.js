import { notFound } from 'next/navigation'
import XIcon from '@/components/icons/XIcon'

async function getAlert(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/alerts/${id}`,
    { cache: 'no-store' }
  )

  if (!res.ok) return null
  return res.json()
}

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

  const isUltra = alert.tier === 'ULTRA_WHALE'
  const isMega = alert.tier === 'MEGA_WHALE'

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-24">

      {/* TIER BADGE */}
      <div className="mb-2">
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            isUltra
              ? 'bg-red-500/20 text-red-400'
              : isMega
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {isUltra ? '🔥 ULTRA WHALE ALERT' : isMega ? '🐳 MEGA WHALE ALERT' : 'WHALE ALERT'}
        </span>
      </div>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {alert.coin}
        </h1>

        <p className="text-xl text-gray-300 mt-1">
          ${Number(alert.usd).toLocaleString()}
        </p>
      </div>

      {/* FLOW */}
      <div className="rounded-xl border border-gray-700 p-4 mb-6 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Transfer Flow
        </p>

        <p className="text-lg mt-1 font-medium">
          {alert.from || 'unknown'} → {alert.to || 'unknown'}
        </p>

        <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
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
      <div className="rounded-lg border border-gray-700 p-4 mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Market Signal (beta)
        </p>
        <p className="font-medium mt-1">
          Neutral flow detected ({alert.signalStrength || 0}%)
        </p>
      </div>

      {/* TELEGRAM CTA */}
      <div className="text-center text-sm text-gray-500 mb-10">
        🔔 Get instant whale alerts on Telegram
        <br />
        <a
          href="https://t.me/CrypTechKingAlpha"
          target="_blank"
          className="text-blue-400 hover:underline font-medium"
        >
          Join CrypTechKing Alpha
        </a>
      </div>

      {/* STICKY ACTION BAR (MOBILE FIRST) */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-black/80 backdrop-blur z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {explorerUrl ? (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:underline"
            >
              Explorer ↗
            </a>
          ) : <span />}

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `🚨 Whale Alert\n\n${alert.coin} • $${Number(alert.usd).toLocaleString()}\n\nView full details 👇\n${detailUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            <XIcon size={16} />
            Share
          </a>
        </div>
      </div>

    </main>
  )
}
