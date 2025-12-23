"use client";
import { useEffect, useState } from "react";

type CountdownData = {
  remainingSeconds: number;
};

export default function Countdown() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Fetch once from API
  useEffect(() => {
    fetch("/api/halving")
      .then((res) => res.json())
      .then((data: CountdownData) => {
        setSecondsLeft(data.remainingSeconds);
      })
      .catch(() => {
        setSecondsLeft(null);
      });
  }, []);

  // Local ticking every second
  useEffect(() => {
    if (secondsLeft === null) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  if (secondsLeft === null) {
    return (
      <div className="text-center text-gray-400">
        Loading countdown…
      </div>
    );
  }

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <TimeBox label="Days" value={days} />
      <TimeBox label="Hours" value={hours} />
      <TimeBox label="Minutes" value={minutes} />
      <TimeBox label="Seconds" value={seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-black/30 border border-white/10 rounded-xl py-6 text-center">
      <div className="text-3xl md:text-4xl font-bold text-green-400">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-gray-400">
        {label}
      </div>
    </div>
  );
}
