"use client";
import { useEffect, useState } from "react";

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
    <section className="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat title="Predicted Date" value={date} />
      <Stat title="Blocks Remaining" value={data.remainingBlocks.toLocaleString()} />
      <Stat title="Seconds Remaining" value={data.remainingSeconds.toLocaleString()} />
      <Stat title="Target Block" value="1,050,000" />
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="card p-5 text-center">
      <p className="text-xs text-gray-400 mb-1">{title}</p>
      <p className="text-xl font-semibold text-green-400">{value}</p>
    </div>
  );
}
