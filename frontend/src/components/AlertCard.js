'use client'

import { useEffect, useState } from 'react'
import XIcon from './icons/XIcon'

export default function AlertCard({ alert }) {
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  const usdValue = Number(alert.usd)
  const isUltra = usdValue >= 50_000_000
  const isMega = usdValue >= 25_000_000 && usdValue < 50_000_000

  const tweetText = `
🚨 ${isUltra ? 'ULTRA' : isMega ? 'MEGA' : ''} WHALE ALERT 🚨

${alert.text}

💰 Value: $${usdValue.toLocaleString()}

🔗 Live alerts: https://cryptechking.vercel.app

#Crypto #WhaleAlert #${alert.coin}
  `.trim()

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 transition-all
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
            ${usdValue.toLocaleString()}
          </p>
        </div>

        {isNew && (
          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Alert Text */}
      <p className="text-gray-300 text-sm mt-3 leading-relaxed">
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
          {isUltra
            ? '🔥 ULTRA WHALE'
            : isMega
            ? '🐳 MEGA WHALE'
            : 'Whale Alert'}
        </span>

        {/* Share */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetText
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-400 hover:text-blue-300"
        >
          <XIcon size={14} />
          Share
        </a>
      </div>
    </div>
  )
}
