export default function AlertCard({ alert }) {
  const usd = (alert.usd / 1_000_000).toFixed(2);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-yellow-500 transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-yellow-400">
          🐳 {alert.coin} Whale Alert
        </h3>
        <span className="text-sm text-zinc-400">
          ${usd}M
        </span>
      </div>

      <p className="text-zinc-300 mt-2 text-sm">
        {alert.text}
      </p>

      <p className="text-xs text-zinc-500 mt-3">
        {new Date(alert.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
