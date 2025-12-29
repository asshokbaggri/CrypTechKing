// frontend/src/app/alerts/[id]/page.js

import { notFound } from 'next/navigation'

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

  const usd = Number(alert.usd || 0)

  const isUltra = usd >= 50_000_000
  const isMega = usd >= 25_000_000 && usd < 50_000_000

  const explorerMap = {
    ethereum: `https://etherscan.io/tx/${alert.txid}`,
    tron: `https://tronscan.org/#/transaction/${alert.txid}`,
    bitcoin: `https://www.blockchain.com/btc/tx/${alert.txid}`,
    ripple: `https://livenet.xrpl.org/transactions/${alert.txid}`
  }

  const explorerUrl = explorerMap[alert.blockchain]

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* HERO */}
      <div>
        <span
          className={`inline-block mb-2 text-xs font-semibold tracking-wide ${
            isUltra
              ? 'text-red-400'
              : isMega
              ? 'text-yellow-400'
              : 'text-gray-400'
          }`}
        >
          {isUltra
            ? '🔥 ULTRA WHALE ALERT'
            : isMega
            ? '🐳 MEGA WHALE ALERT'
            : 'WHALE ALERT'}
        </span>

        <h1 className="text-3xl font-bold">
          {alert.coin}
        </h1>

        <p className="text-xl text-gray-300 mt-1">
          ${usd.toLocaleString()}
        </p>
      </div>

      {/* TRANSFER FLOW */}
      <div className="rounded-xl border border-gray-700 p-5 text-center">
        <p className="text-sm text-gray-400 mb-2">Transfer Flow</p>

        <p className="text-lg font-medium">
          {alert.from || 'unknown'} <span className="mx-2">→</span> {alert.to || 'unknown'}
        </p>

        <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
          {alert.blockchain}
        </p>
      </div>

      {/* INTELLIGENCE GRID */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg border border-gray-700 p-4">
          <span className="text-gray-500">USD Value</span>
          <p className="mt-1 text-lg font-semibold">
            ${usd.toLocaleString()}
          </p>
        </div>

        {alert.amountToken && (
          <div className="rounded-lg border border-gray-700 p-4">
            <span className="text-gray-500">Token Amount</span>
            <p className="mt-1 text-lg font-semibold">
              {Number(alert.amountToken).toLocaleString()} {alert.coin}
            </p>
          </div>
        )}

        <div className="rounded-lg border border-gray-700 p-4">
          <span className="text-gray-500">Tier</span>
          <p className="mt-1 font-medium">
            {alert.tier}
          </p>
        </div>

        <div className="rounded-lg border border-gray-700 p-4">
          <span className="text-gray-500">Time</span>
          <p className="mt-1">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* SIGNAL (LIGHTWEIGHT) */}
      {alert.signal && (
        <div className="rounded-xl border border-gray-700 p-4 text-sm">
          <span className="text-gray-500">Signal</span>
          <p className="mt-1 font-medium">
            {alert.signal} ({alert.signalStrength || 0}%)
          </p>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex items-center gap-4">
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            View on Blockchain Explorer ↗
          </a>
        )}

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            alert.text
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:underline"
        >
          Share on X ↗
        </a>
      </div>

    </main>
  )
}
