'use client'

import { useEffect, useState } from 'react'

export default function AlertCard({ alert }) {
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 8000)
    return () => clearTimeout(timer)
  }, [])

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

      {/* SHARE BUTTON */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          alert.text
        )}`}
        target="_blank"
        className="inline-block mt-3 text-blue-400 hover:underline text-sm"
      >
        🐦 Share on X
      </a>
    </div>
  )
}
