import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">👑 CrypTechKing</h1>
      <p className="text-gray-400 mb-8">
        Real-time crypto whale alerts powered by on-chain intelligence.
      </p>

      <Link
        href="/alerts"
        className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400"
      >
        View Live Alerts 🚨
      </Link>
    </main>
  );
}
