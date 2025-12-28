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

  const explorerMap = {
    ethereum: `https://etherscan.io/tx/${alert.txid}`,
    tron: `https://tronscan.org/#/transaction/${alert.txid}`,
    bitcoin: `https://www.blockchain.com/btc/tx/${alert.txid}`,
    ripple: `https://livenet.xrpl.org/transactions/${alert.txid}`
  }

  const explorerUrl = explorerMap[alert.blockchain]

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-5">
        {alert.coin} Whale Alert
      </h1>

      <div className="rounded-xl border border-gray-700 p-5 space-y-5">

        {/* MAIN TEXT */}
        <p className="text-gray-300 leading-relaxed">
          {alert.text}
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Value (USD)</span>
            <p>${Number(alert.usd).toLocaleString()}</p>
          </div>

          {alert.amountToken && (
            <div>
              <span className="text-gray-500">Amount</span>
              <p>
                {Number(alert.amountToken).toLocaleString()} {alert.coin}
              </p>
            </div>
          )}

          <div>
            <span className="text-gray-500">Tier</span>
            <p>{alert.tier}</p>
          </div>

          <div>
            <span className="text-gray-500">Blockchain</span>
            <p className="capitalize">{alert.blockchain}</p>
          </div>

          <div>
            <span className="text-gray-500">From</span>
            <p>{alert.from || 'unknown'}</p>
          </div>

          <div>
            <span className="text-gray-500">To</span>
            <p>{alert.to || 'unknown'}</p>
          </div>

          <div className="col-span-2">
            <span className="text-gray-500">Time</span>
            <p>{new Date(alert.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* EXPLORER */}
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-400 hover:underline text-sm"
          >
            View on Blockchain Explorer ↗
          </a>
        )}
      </div>
    </main>
  )
}
