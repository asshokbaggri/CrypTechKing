import { notFound } from 'next/navigation';

async function getAlert(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/alerts/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function AlertDetail({ params }) {
  const res = await getAlert(params.id);
  const alert = res?.data;

  if (!alert) return notFound();

  const explorerMap = {
    ethereum: `https://etherscan.io/tx/${alert.txid}`,
    tron: `https://tronscan.org/#/transaction/${alert.txid}`,
    bitcoin: `https://www.blockchain.com/btc/tx/${alert.txid}`
  };

  const explorerUrl = explorerMap[alert.blockchain];

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {alert.coin} Whale Alert
      </h1>

      <div className="rounded-xl border border-gray-700 p-5 space-y-4">

        <p className="text-gray-300">{alert.text}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Value</span>
            <p>${Number(alert.usd).toLocaleString()}</p>
          </div>

          <div>
            <span className="text-gray-500">Tier</span>
            <p>{alert.tier}</p>
          </div>

          <div>
            <span className="text-gray-500">Blockchain</span>
            <p>{alert.blockchain}</p>
          </div>

          <div>
            <span className="text-gray-500">Time</span>
            <p>{new Date(alert.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="text-sm">
          <p><span className="text-gray-500">From:</span> {alert.from}</p>
          <p><span className="text-gray-500">To:</span> {alert.to}</p>
        </div>

        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            className="inline-block text-blue-400 hover:underline text-sm"
          >
            View Transaction ↗
          </a>
        )}
      </div>
    </main>
  );
}
