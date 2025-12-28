import { notFound } from 'next/navigation';

async function getAlert(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/alerts/${id}`,
      { cache: 'no-store' }
    );

    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function AlertDetail({ params }) {
  const res = await getAlert(params.id);
  const alert = res?.data;

  if (!alert) return notFound();

  // 🧠 SAFE FALLBACKS (no undefined access)
  const coin = alert.coin || 'TOKEN';
  const usd =
    typeof alert.usd === 'number'
      ? `$${alert.usd.toLocaleString()}`
      : '—';

  const amountToken =
    typeof alert.amountToken === 'number'
      ? `${alert.amountToken.toLocaleString()} ${coin}`
      : null;

  const tier = alert.tier || 'WHALE';
  const blockchain = alert.blockchain || 'unknown';
  const from = alert.from || 'unknown';
  const to = alert.to || 'unknown';
  const time = alert.createdAt
    ? new Date(alert.createdAt).toLocaleString()
    : '—';

  // 🧠 Explorer links (safe)
  const explorerMap = {
    ethereum: (tx) => `https://etherscan.io/tx/${tx}`,
    tron: (tx) => `https://tronscan.org/#/transaction/${tx}`,
    bitcoin: (tx) => `https://www.blockchain.com/btc/tx/${tx}`,
    ripple: (tx) => `https://livenet.xrpl.org/transactions/${tx}`
  };

  const explorerFn = explorerMap[blockchain.toLowerCase()];
  const explorerUrl =
    explorerFn && alert.txid ? explorerFn(alert.txid) : null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">
        {coin} Whale Alert
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {tier.replace('_', ' ')} • {blockchain.toUpperCase()}
      </p>

      <div className="rounded-xl border border-gray-700 p-5 space-y-4">

        {/* Main text */}
        {alert.text && (
          <p className="text-gray-300 leading-relaxed">
            {alert.text}
          </p>
        )}

        {/* Core stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Value (USD)</span>
            <p>{usd}</p>
          </div>

          <div>
            <span className="text-gray-500">Token Amount</span>
            <p>{amountToken || '—'}</p>
          </div>

          <div>
            <span className="text-gray-500">From</span>
            <p>{from}</p>
          </div>

          <div>
            <span className="text-gray-500">To</span>
            <p>{to}</p>
          </div>

          <div className="col-span-2">
            <span className="text-gray-500">Time</span>
            <p>{time}</p>
          </div>
        </div>

        {/* Explorer */}
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-400 hover:underline text-sm"
          >
            View Transaction ↗
          </a>
        )}
      </div>
    </main>
  );
}
