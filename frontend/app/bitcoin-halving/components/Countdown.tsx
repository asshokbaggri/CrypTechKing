"use client";
import { useEffect, useState } from "react";

type CountdownData = {
  remainingSeconds: number;
};

export default function Countdown() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/halving")
      .then((res) => res.json())
      .then((data: CountdownData) => setSecondsLeft(data.remainingSeconds));
  }, []);

  useEffect(() => {
    if (secondsLeft === null) return;
    const t = setInterval(() => {
      setSecondsLeft((p) => (p && p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  if (secondsLeft === null) {
    return <div className="muted text-center">Loading countdown…</div>;
  }

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <section className="card p-8 text-center">
      <h2 className="muted mb-6">Estimated Time Remaining</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-4xl font-bold">
        <TimeBox label="Days" value={days} />
        <TimeBox label="Hours" value={hours} />
        <TimeBox label="Minutes" value={minutes} />
        <TimeBox label="Seconds" value={seconds} />
      </div>
    </section>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div>{value}</div>
      <div className="text-sm muted font-normal">{label}</div>
    </div>
  );
}
