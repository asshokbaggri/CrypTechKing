// frontend/src/components/Footer.js

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16 bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* TOP */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">

          {/* BRAND */}
          <div>
            <p className="text-sm font-semibold text-gray-300">
              CrypTechKing 👑
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Real-time crypto whale intelligence
            </p>
          </div>

          {/* LINKS */}
          <div className="flex items-center justify-center sm:justify-end gap-5 text-sm">
            <Link
              href="/alerts"
              className="text-gray-400 hover:text-white transition"
            >
              Alerts
            </Link>

            <a
              href="https://t.me/CrypTechKingAlpha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Telegram
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              X
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-6 border-t border-gray-800 pt-4 text-center">
          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} CrypTechKing. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
