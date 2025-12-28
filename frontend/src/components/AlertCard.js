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

  return (
    <Link href={`/alerts/${alert._id}`} className="block">
      <div
        className={`rounded-xl border p-4 sm:p-5 transition-all cursor-pointer
          hover:border-gray-500
          ${
            isUltra
              ? 'border-red-500 shadow-lg shadow-red-500/20'
              : isMega
              ? 'border-yellow-400 shadow-lg shadow-yellow-500/20'
              : 'border-gray-700'
          }`}
      >
        {/* TOP */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
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

        {/* MIDDLE */}
        <div className="mt-3 space-y-1 text-sm text-gray-300">
          {alert.amountToken && (
            <p>
              {Number(alert.amountToken).toLocaleString()} {alert.coin}
            </p>
          )}

          <p className="text-gray-400">
            {alert.from || 'unknown'} → {alert.to || 'unknown'}
          </p>

          <p className="uppercase text-xs tracking-wide text-gray-500">
            {alert.blockchain}
          </p>
        </div>

        {/* BOTTOM */}
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

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              alert.text
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"
          >
            <XIcon size={14} />
            Share
          </a>
        </div>
      </div>
    </Link>
  )
}
