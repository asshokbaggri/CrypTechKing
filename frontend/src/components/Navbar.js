'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="CrypTechKing Logo"
            width={28}
            height={28}
            priority
          />

          <Image
            src="/brand-name.png"
            alt="CrypTechKing"
            width={120}
            height={28}
            priority
            className="hidden sm:block"
          />
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/alerts"
            className="text-gray-300 hover:text-white transition"
          >
            Alerts
          </Link>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition"
          >
            X
          </a>
        </nav>
      </div>
    </header>
  )
}
