export default function CoinAvatar({ symbol, size = 32 }) {
  const coin = symbol?.toLowerCase()

  return (
    <img
      src={`/coins/${coin}.svg`}
      alt={symbol}
      width={size}
      height={size}
      className="rounded-full bg-black"
      onError={(e) => {
        e.currentTarget.src = '/coins/default.svg'
      }}
    />
  )
}
