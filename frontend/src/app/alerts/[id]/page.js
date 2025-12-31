import { notFound } from 'next/navigation'
import XIcon from '@/components/icons/XIcon'
import AlertHeader from '@/components/AlertHeader'

async function getAlert(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/alerts/${id}`,
    { cache: 'no-store' }
  )

  if (!res.ok) return null
  return res.json()
}

function formatWallet(label) {
  if (!label || label.toLowerCase() === 'unknown') {
    return 'Unknown wallet'
  }
  return label
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

  const shareText = `
${alert.text}

🔍 Full details:
${detailUrl}
  `.trim()

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
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
            shareText
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300"
        >
          <XIcon size={14} />
          Share
        </a>
      </div>
    </main>
  )
}
