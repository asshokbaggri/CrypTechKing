'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import XIcon from './icons/XIcon'
import CoinAvatar from './CoinAvatar'

/**
 * 🧠 SAME CLEANER AS DETAIL PAGE (X SHARE ONLY)
 * - removes duplicate MEGA / ULTRA headings
 * - fixes unknown → unknown wallet
 * - keeps original alert.text format
 */
function cleanTextForX(text = '') {
  let cleaned = text

  // ❌ remove duplicated inner headings
  cleaned = cleaned.replace(
    /(🚨🐳 MEGA WHALE ALERT|🔥🐳 ULTRA WHALE ALERT)\s*\n*/gi,
    ''
  )

  // ✅ normalize wallet labels
  cleaned = cleaned.replace(/From:\s*unknown(\s*wallet)?/gi, 'From: unknown wallet')
  cleaned = cleaned.replace(/To:\s*unknown(\s*wallet)?/gi, 'To: unknown wallet')

  return cleaned.trim()
}

export default function AlertCard({ alert }) {
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsNew(false), 6000)
    return () => clearTimeout(t)
  }, [])

  const usd = Number(alert.usd || 0)
  const isUltra = usd >= 50_000_000
  const isMega = usd >= 25_000_000 && usd < 50_000_000

  const detailUrl = `https://cryptechking.vercel.app/alerts/${alert._id}`

  const xShareText = `
${cleanTextForX(alert.text)}

🔍 Full details:
${detailUrl}
`.trim()

  return (
    <Link href={`/alerts/${alert._id}`} className="block">
      <div
        className={`
          relative rounded-xl border p-4 sm:p-5
          transition-colors cursor-pointer
          active:scale-[0.99]
          ${
            isUltra
              ? 'border-red-500 bg-red-500/5 shadow-lg shadow-red-500/20'
              : isMega
              ? 'border-yellow-400 bg-yellow-400/5 shadow-lg shadow-yellow-500/20'
              : 'border-gray-700 hover:border-gray-500'
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <CoinAvatar symbol={alert.coin} size={28} />

            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                {alert.coin}
              </h3>
              <p className="text-sm text-gray-400 mt-0.5">
                ${usd.toLocaleString()}
              </p>
            </div>
          </div>

          {isNew && (
            <span className="shrink-0 text-[10px] font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* BODY */}
        <div className="mt-3 space-y-1.5 text-sm">
          {alert.amountToken && (
            <p className="text-gray-200 font-medium">
              {Number(alert.amountToken).toLocaleString()} {alert.coin}
            </p>
          )}

          <p className="text-gray-400">
            <span className="text-gray-500">From:</span>{' '}
            {alert.from?.toLowerCase() === 'unknown'
              ? 'unknown wallet'
              : alert.from || 'unknown wallet'}
            <span className="mx-1 text-gray-500">→</span>
            <span className="text-gray-300">
              {alert.to?.toLowerCase() === 'unknown'
                ? 'unknown wallet'
                : alert.to || 'unknown wallet'}
            </span>
          </p>

          <p className="uppercase text-[11px] tracking-wider text-gray-500">
            {alert.blockchain}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-4">
          <span
            className={`text-xs font-semibold tracking-wide ${
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
              : 'WHALE ALERT'}
          </span>

          {/* X SHARE (CLEAN + SAME FORMAT AS DETAIL PAGE) */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              xShareText
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300"
          >
            <XIcon size={14} />
            Share
          </a>
        </div>
      </div>
    </Link>
  )
}
