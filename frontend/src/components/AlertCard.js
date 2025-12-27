export default function AlertCard({ alert, isNew }) {
  const tweetText = encodeURIComponent(alert.text);

  return (
    <div
      className={`border rounded-lg p-4 bg-[#0f172a] transition
        ${isNew ? 'animate-pulse border-yellow-400 shadow-lg' : 'border-gray-700'}
      `}
    >
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-lg">{alert.coin}</h2>

        {/* SHARE */}
        <a
          href={`https://twitter.com/intent/tweet?text=${tweetText}`}
          target="_blank"
          className="text-sm text-blue-400 hover:underline"
        >
          Share
        </a>
      </div>

      <p className="mt-2 text-sm text-gray-200">{alert.text}</p>

      <p className="mt-2 text-xs text-gray-400">
        ${alert.usd.toLocaleString()}
      </p>
    </div>
  );
}
