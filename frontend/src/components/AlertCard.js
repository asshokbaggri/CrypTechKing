export default function AlertCard({ alert }) {
  return (
    <div className="border border-gray-800 rounded-lg p-4 bg-zinc-900">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">
          {new Date(alert.createdAt).toLocaleString()}
        </span>
        <span className="text-xs bg-red-600 px-2 py-1 rounded">
          {alert.type}
        </span>
      </div>

      <p className="text-lg font-semibold mb-1">
        {alert.coin.toUpperCase()} • ${alert.usd.toLocaleString()}
      </p>

      <p className="text-gray-300 text-sm">
        {alert.text}
      </p>
    </div>
  );
}
