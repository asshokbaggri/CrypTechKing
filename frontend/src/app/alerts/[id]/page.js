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

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-24">

      {/* HEADER */}
      <div className="mb-6">
        <span className="inline-block text-[11px] font-semibold tracking-wide px-2 py-1 rounded-full bg-gray-800 text-gray-300">
          {alert.tier?.replace('_', ' ')}
        </span>

        <h1 className="text-2xl font-bold mt-2">
          {alert.coin}
        </h1>

        <p className="text-lg text-gray-300 mt-1">
          ${Number(alert.usd).toLocaleString()}
        </p>
      </div>

      {/* FLOW */}
      <div className="rounded-xl border border-gray-700 p-4 mb-6 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Transfer Flow
        </p>

        <p className="text-base font-medium mt-2">
          {alert.from || 'unknown'}
          <span className="mx-2 text-gray-500">→</span>
          {alert.to || 'unknown'}
        </p>

        <span className="inline-block mt-2 text-[11px] uppercase tracking-wider text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
          {alert.blockchain}
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="rounded-lg border border-gray-700 p-3">
          <p className="text-[11px] text-gray-400">USD Value</p>
          <p className="text-base font-semibold">
            ${Number(alert.usd).toLocaleString()}
          </p>
        </div>

        {alert.amountToken && (
          <div className="rounded-lg border border-gray-700 p-3">
            <p className="text-[11px] text-gray-400">Token Amount</p>
            <p className="text-base font-semibold">
              {Number(alert.amountToken).toLocaleString()} {alert.coin}
            </p>
          </div>
        )}

        <div className="rounded-lg border border-gray-700 p-3">
          <p className="text-[11px] text-gray-400">Tier</p>
          <p className="text-sm font-medium">
            {alert.tier}
          </p>
        </div>

        <div className="rounded-lg border border-gray-700 p-3">
          <p className="text-[11px] text-gray-400">Time</p>
          <p className="text-xs">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* SIGNAL */}
      <div className="rounded-lg border border-gray-700 p-4 mb-6">
        <p className="text-[11px] text-gray-400 uppercase tracking-wide">
          Market Signal (beta)
        </p>
        <p className="text-sm font-medium mt-1">
          Neutral flow detected ({alert.signalStrength || 0}%)
        </p>
      </div>

      {/* TELEGRAM CTA */}
      <div className="mt-6 text-center text-sm text-gray-500">
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
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-black/90 backdrop-blur border-t border-gray-800 px-4 py-3 flex items-center justify-between sm:hidden">

        {explorerUrl ? (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400"
          >
            Explorer ↗
          </a>
        ) : (
          <span />
        )}

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `🚨 Whale Alert\n\n${alert.coin} • $${Number(alert.usd).toLocaleString()}\n\nFull details 👇\n${detailUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400"
        >
          <XIcon size={16} />
          Share
        </a>
      </div>

    </main>
  )
}
