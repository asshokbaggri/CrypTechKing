import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API;

export default function useSmartMoney() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    let ws;

    async function loadInitial() {
      try {
        const res = await fetch(`${API}/smartmoney/live`);
        const data = await res.json();
        setWallets(data || []);
      } catch {
        setWallets([]);
      }
    }

    loadInitial();

    ws = new WebSocket(`${API.replace("https", "wss")}/ws/smartmoney`);

    ws.onmessage = (msg) => {
      const newRow = JSON.parse(msg.data);
      setWallets((prev) => [newRow, ...prev].slice(0, 50));
    };

    return () => ws && ws.close();
  }, []);

  return wallets;
}
