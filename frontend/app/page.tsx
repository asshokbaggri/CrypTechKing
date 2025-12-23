import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link
        href="/bitcoin-halving"
        className="text-accent text-xl underline"
      >
        Go to Bitcoin Halving Countdown
      </Link>
    </div>
  );
}
