'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import XIcon from './icons/XIcon'

export default function AlertCard({ alert }) {
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  // 🧠 SAFE values (no crash)
  const usdValue = typeof alert.usd === 'number' ? alert.usd : 0
  const tokenAmount =
    typeof alert.amountToken === 'number' ? alert.amountToken : null

  const coin = alert.coin || 'TOKEN'
  const blockchain = alert.blockchain || ''
  const from = alert.from || 'unknown'
  const to = alert.to || 'unknown'

  // 🐳 Tier detection (UI-only)
  const isUltra = usdValue >= 50_000_000
  const isMega = usdValue >= 25_000_000 && usdValue < 50_000_000

  // 🧠 Smart summary line
  const summaryLine = tokenAmount
    ? `${Number(tokenAmount).toLocaleString()} ${coin} ($${usdValue.toLocaleString()})`
    : `$${usdValue.toLocaleString()}`

  const tweetText = `
🚨 ${isUltra ? 'ULTRA' : isMega ? 'MEGA' : ''} WHALE ALERT 🚨

${summaryLine}
${from} → ${to}
${blockchain.toUpperCase()}

🔗 Live alerts: https://cryptechking.vercel.app

#Crypto #WhaleAlert #${coin}
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
              {coin}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              {summaryLine}
            </p>
          </div>

          {isNew && (
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* From → To */}
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          {from} → {to}
        </p>

        {/* Blockchain */}
        {blockchain && (
          <p className="text-[11px] uppercase tracking-wide text-gray-500 mt-1">
            {blockchain}
          </p>
        )}

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

          {/* SHARE ON X */}
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
