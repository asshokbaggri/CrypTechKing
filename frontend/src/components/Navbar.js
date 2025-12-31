// frontend/src/components/Navbar.js

'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO + BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="CrypTechKing Logo"
            width={36}
            height={36}
            priority
            className="shrink-0"
          />

          {/* Brand name */}
          <Image
            src="/brand-name.png"
            alt="CrypTechKing"
            width={150}
            height={32}
            priority
            className="hidden sm:block"
          />

          {/* Mobile brand (slightly smaller) */}
          <Image
            src="/brand-name.png"
            alt="CrypTechKing"
            width={110}
            height={26}
            priority
            className="sm:hidden"
          />
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/alerts"
            className="text-gray-300 hover:text-white transition font-medium"
          >
            Alerts
          </Link>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition font-medium"
          >
            X
          </a>
        </nav>
      </div>
    </header>
  )
}
