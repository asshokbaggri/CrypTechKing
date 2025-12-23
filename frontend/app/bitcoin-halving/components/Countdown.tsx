"use client";
import { useEffect, useState } from "react";

type CountdownData = {
  remainingSeconds: number;
};

export default function Countdown() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // fetch once from server
  useEffect(() => {
    fetch("/api/halving")
      .then((res) => res.json())
      .then((data: CountdownData) => {
        setSecondsLeft(data.remainingSeconds);
      });
  }, []);

  // local ticking (derived, not fetched)
  useEffect(() => {
    if (secondsLeft === null) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  if (secondsLeft === null) {
    return <div className="opacity-70">Loading countdown...</div>;
  }

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="bg-card p-6 rounded-xl text-center my-8">
      <h2 className="text-xl mb-4 opacity-80">Estimated Time Remaining</h2>

      <div className="grid grid-cols-4 gap-4 text-2xl text-accent">
        <div>
          {days}
          <div className="text-sm opacity-70">Days</div>
        </div>
        <div>
          {hours}
          <div className="text-sm opacity-70">Hours</div>
        </div>
        <div>
          {minutes}
          <div className="text-sm opacity-70">Minutes</div>
        </div>
        <div>
          {seconds}
          <div className="text-sm opacity-70">Seconds</div>
        </div>
      </div>
    </div>
  );
}
