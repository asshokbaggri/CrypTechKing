"use client";
import { useEffect, useState } from "react";

export default function BTCPriceLive() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@miniTicker"
    );

    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      setPrice(Number(d.c));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="text-accent text-2xl">
      ${price?.toLocaleString() ?? "..."} ● Live
    </div>
  );
}
