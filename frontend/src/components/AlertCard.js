'use client'

import { useEffect, useState } from 'react'
import XIcon from './icons/XIcon'

export default function AlertCard({ alert }) {
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  const tweetText = `
🚨 MEGA WHALE ALERT 🚨

${alert.text}

💰 Value: $${Number(alert.usd).toLocaleString()}

🔗 Live alerts: https://cryptechking.vercel.app

#Crypto #WhaleAlert #${alert.coin}
  `.trim()

  return (
    <div
      className={`border rounded-xl p-4 transition-all ${
        isNew
          ? 'border-yellow-400 shadow-lg shadow-yellow-500/30 animate-pulse'
          : 'border-gray-700'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{alert.coin}</h3>

        {isNew && (
          <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      <p className="text-gray-300 mt-2">{alert.text}</p>

      <p className="text-sm text-gray-400 mt-2">
        ${Number(alert.usd).toLocaleString()}
      </p>

      {/* SHARE ON X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 text-blue-400 hover:text-blue-300 text-sm"
      >
        <XIcon size={14} />
        Share on X
      </a>
    </div>
  )
}
