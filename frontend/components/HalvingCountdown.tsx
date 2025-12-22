"use client";

import { useEffect, useState } from "react";

export default function HalvingCountdown({ seconds }: { seconds: number }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const d = Math.floor(time / 86400);
  const h = Math.floor((time % 86400) / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;

  return (
    <div className="card">
      <h2>⏳ Bitcoin Halving Countdown</h2>
      <h1>{d}d {h}h {m}m {s}s</h1>
    </div>
  );
}
