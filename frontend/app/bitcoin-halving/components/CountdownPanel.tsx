"use client";
import { useEffect, useState } from "react";

export default function CountdownPanel() {
  const [s, setS] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/halving")
      .then((r) => r.json())
      .then((d) => setS(d.remainingSeconds));
  }, []);

  useEffect(() => {
    if (s === null) return;
    const t = setInterval(() => setS((p) => (p! > 0 ? p! - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [s]);

  if (s === null) return null;

  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  return (
    <section className="section">
      <div className="card p-8 text-center">
        <h2 className="text-gray-400 mb-6">Estimated Time Remaining</h2>
        <div className="grid grid-cols-4 gap-6 text-3xl font-bold">
          <Box v={d} l="Days" />
          <Box v={h} l="Hours" />
          <Box v={m} l="Minutes" />
          <Box v={sec} l="Seconds" />
        </div>
      </div>
    </section>
  );
}

function Box({ v, l }: { v: number; l: string }) {
  return (
    <div>
      <div className="text-green-400">{v}</div>
      <div className="text-sm text-gray-400 font-normal">{l}</div>
    </div>
  );
}
