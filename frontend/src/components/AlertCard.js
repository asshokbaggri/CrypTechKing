'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import XIcon from './icons/XIcon'

export default function AlertCard({ alert }) {
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsNew(false), 6000)
    return () => clearTimeout(t)
  }, [])

  const usd = Number(alert.usd || 0)

  const isUltra = usd >= 50_000_000
  const isMega = usd >= 25_000_000 && usd < 50_000_000

  const tierLabel = isUltra
    ? 'ULTRA WHALE'
    : isMega
    ? 'MEGA WHALE'
    : 'WHALE ALERT'

  const tierEmoji = isUltra
    ? '🔥🔥'
    : isMega
    ? '🚨🚨'
    : '🐳'

  const from = alert.from || 'unknown'
  const to = alert.to || 'unknown'
  const chain = alert.blockchain
    ? alert.blockchain.toUpperCase()
    : 'BLOCKCHAIN'

  const detailUrl = `https://cryptechking.vercel.app/alerts/${alert._id}`

  // ✅ FINAL X SHARE TEXT
  const tweetText = `
${tierEmoji} ${tierLabel} — ${alert.coin}

$${usd.toLocaleString()}
Transferred on ${chain}

From: ${from}
To: ${to}

👀 Large on-chain movement detected

🔗 Full details:
${detailUrl}

#Crypto #WhaleAlert #${alert.coin}
`.trim()

  return (
    <Link href={`/alerts/${alert._id}`} className="block">
      <div
        className={`rounded-xl border p-4 sm:p-5 transition-all cursor-pointer hover:border-gray-500
          ${
            isUltra
              ? 'border-red-500 shadow-lg shadow-red-500/20'
              : isMega
              ? 'border-yellow-400 shadow-lg shadow-yellow-500/20'
              : 'border-gray-700'
          }
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-base sm:text-lg">
              {alert.coin}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              ${usd.toLocaleString()}
            </p>
          </div>

          {isNew && (
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Compact Text */}
        <p className="text-gray-300 text-sm mt-3 leading-relaxed line-clamp-3">
          {alert.text}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span
            className={`text-xs font-medium ${
              isUltra
                ? 'text-red-400'
                : isMega
                ? 'text-yellow-400'
                : 'text-gray-500'
            }`}
          >
            {tierEmoji} {tierLabel}
          </span>

          {/* X SHARE */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweetText
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-400 hover:text-blue-300"
          >
            <XIcon size={14} />
            Share
          </a>
        </div>
      </div>
    </Link>
  )
}
