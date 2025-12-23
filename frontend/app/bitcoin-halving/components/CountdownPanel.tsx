"use client";
import Countdown from "./Countdown";

export default function CountdownPanel() {
  return (
    <div className="card p-8">
      <h2 className="text-lg font-semibold mb-4">
        Estimated Time Remaining
      </h2>
      <Countdown />
    </div>
  );
}
