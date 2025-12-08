import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API;

export default function usePumpScanner() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    let ws;

    async function loadInitial() {
      try {
        const res = await fetch(`${API}/pump/trending?limit=50`);
        const data = await res.json();
        setCoins(data || []);
      } catch {
        setCoins([]);
      }
    }

    loadInitial();

    ws = new WebSocket(`${API.replace("https", "wss")}/ws/pump`);

    ws.onmessage = (msg) => {
      const newCoin = JSON.parse(msg.data);
      setCoins((prev) => [newCoin, ...prev].slice(0, 50));
    };

    return () => ws && ws.close();
  }, []);

  return coins;
}
