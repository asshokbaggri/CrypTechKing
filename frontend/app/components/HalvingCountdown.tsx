"use client";

import { useEffect, useState } from "react";

export default function HalvingCountdown({ seconds }: { seconds: number }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const i = setInterval(() => {
      setTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const secs = time % 60;

  return (
    <div className="card hero">
      <h2>⏳ Bitcoin Halving Countdown</h2>

      <div className="timer">
        <TimeBox label="Days" value={days} />
        <TimeBox label="Hours" value={hours} />
        <TimeBox label="Min" value={minutes} />
        <TimeBox label="Sec" value={secs} />
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="time-box">
      <div className="time">{String(value).padStart(2, "0")}</div>
      <div className="label">{label}</div>
    </div>
  );
}
