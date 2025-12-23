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
    <section className="bg-[#121821] rounded-xl p-6 text-center mb-12">
      <h2 className="text-gray-400 mb-4">Estimated Time Remaining</h2>

      <div className="grid grid-cols-4 gap-4 text-3xl font-bold">
        <TimeBox label="Days" value={days} />
        <TimeBox label="Hours" value={hours} />
        <TimeBox label="Minutes" value={minutes} />
        <TimeBox label="Seconds" value={seconds} />
      </div>
    </section>
  );

  function TimeBox({ label, value }: { label: string; value: number }) {
    return (
      <div>
        <div>{value}</div>
        <div className="text-sm text-gray-400 font-normal">{label}</div>
      </div>
    );
  }

