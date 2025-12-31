'use client'

import CoinAvatar from '@/components/CoinAvatar'

export default function AlertHeader({ coin, usd, tier }) {
  return (
    <div className="mb-6">
      <span className="text-xs tracking-wide text-gray-400 uppercase">
        {tier?.replace('_', ' ')}
      </span>

      <div className="flex items-center gap-3 mt-1">
        <CoinAvatar symbol={coin} size={40} />

        <div>
          <h1 className="text-3xl font-bold">
            {coin}
          </h1>

          <p className="text-xl text-gray-300 mt-1">
            ${Number(usd).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
