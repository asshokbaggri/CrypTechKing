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
    <section className="text-center">
      <p className="text-sm muted mb-2">Bitcoin Price</p>
      <p className="text-4xl md:text-5xl font-semibold accent">
        ${price?.toLocaleString() ?? "..."}{" "}
        <span className="text-sm font-normal">● Live</span>
      </p>
    </section>
  );
}
