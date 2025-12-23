"use client";
import { useEffect, useState } from "react";
import BTCPriceLive from "./BTCPriceLive";

type Data = {
  remainingBlocks: number;
  remainingSeconds: number;
};

export default function TopStats() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/halving")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const date = new Date(
    Date.now() + data.remainingSeconds * 1000
  ).toDateString();

  return (
    <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <Stat title="Predicted Date" value={date} />
      <Stat title="Est. Time Remaining" value={`${Math.floor(data.remainingSeconds / 86400)} Days`} />
      <Stat title="Blocks Remaining" value={data.remainingBlocks.toLocaleString()} />
      <div className="card p-6 text-center">
        <p className="text-xs text-gray-400 mb-2">Bitcoin Price</p>
        <BTCPriceLive />
      </div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="card p-6 text-center">
      <p className="text-xs text-gray-400 mb-2">{title}</p>
      <p className="text-2xl font-semibold text-green-400">{value}</p>
    </div>
  );
}
