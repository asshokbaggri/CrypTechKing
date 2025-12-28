import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-5 sm:px-6 py-16 sm:py-24">
      
      {/* Badge */}
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-xs text-yellow-400">
        🐳 Live On-Chain Intelligence
      </span>

      {/* Hero Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
        CrypTechKing <span className="text-yellow-400">👑</span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-xl text-sm sm:text-base text-gray-400 mb-10 leading-relaxed">
        Track high-impact crypto whale movements in real time.  
        Filter noise. Spot institutional activity. Stay ahead.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/alerts"
          className="px-7 py-3 rounded-lg bg-yellow-500 text-black font-semibold text-sm sm:text-base hover:bg-yellow-400 transition"
        >
          🚨 View Live Alerts
        </Link>

        <Link
          href="/alerts"
          className="px-7 py-3 rounded-lg border border-gray-700 text-gray-300 text-sm sm:text-base hover:border-gray-500 hover:text-white transition"
        >
          Learn How It Works
        </Link>
      </div>

      {/* Footer hint */}
      <p className="mt-12 text-[11px] text-gray-500">
        Built for traders, analysts & on-chain researchers
      </p>
    </main>
  );
}
