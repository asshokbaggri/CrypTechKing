import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-yellow-400">
          👑 CrypTechKing
        </h1>

        <p className="text-zinc-400">
          Real-time crypto whale intelligence
        </p>

        <Link
          href="/alerts"
          className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300"
        >
          View Live Alerts 🚨
        </Link>
      </div>
    </main>
  );
}
