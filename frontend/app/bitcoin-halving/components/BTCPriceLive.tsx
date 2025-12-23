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
    <div className="text-center mb-8">
      <p className="text-gray-400 text-sm mb-1">Bitcoin Price</p>
      <p className="text-3xl font-semibold text-green-400">
        ${price?.toLocaleString() ?? "..."} <span className="text-sm">● Live</span>
      </p>
    </div>
  );
}
