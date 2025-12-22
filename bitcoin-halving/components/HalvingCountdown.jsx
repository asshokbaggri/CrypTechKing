"use client";
import { useEffect, useState } from "react";
import {
  getCurrentBlock,
  HALVING_BLOCK,
  estimateHalvingDate
} from "@/lib/api";

export default function HalvingCountdown() {
  const [block, setBlock] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    async function load() {
      const current = await getCurrentBlock();
      const left = HALVING_BLOCK - current;

      setBlock(current);
      setRemaining(left);
      setDate(estimateHalvingDate(left));
    }
    load();
    const timer = setInterval(load, 60000); // refresh every 60s
    return () => clearInterval(timer);
  }, []);

  if (!block) return <p>Loading live blockchain data…</p>;

  return (
    <div>
      <h2>⛓️ Bitcoin Halving Countdown</h2>
      <p>Current Block: <b>{block}</b></p>
      <p>Blocks Remaining: <b>{remaining}</b></p>
      <p>Estimated Date: <b>{date.toUTCString()}</b></p>
    </div>
  );
}
