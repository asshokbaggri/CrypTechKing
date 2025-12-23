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
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-2">Bitcoin Price</p>
      <p className="text-4xl font-semibold text-green-400">
        ${price?.toLocaleString()} <span className="text-sm">● Live</span>
      </p>
    </div>
  );
}
