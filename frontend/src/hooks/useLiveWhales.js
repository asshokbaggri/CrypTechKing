import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API;

export default function useLiveWhales() {
  const [whales, setWhales] = useState([]);

  useEffect(() => {
    let ws;

    async function loadInitial() {
      try {
        const res = await fetch(`${API}/whales?limit=50`);
        const data = await res.json();
        setWhales(data || []);
      } catch {
        setWhales([]);
      }
    }

    loadInitial();

    ws = new WebSocket(`${API.replace("https", "wss")}/ws/whales`);

    ws.onmessage = (msg) => {
      const newTx = JSON.parse(msg.data);
      setWhales((prev) => [newTx, ...prev].slice(0, 50));
    };

    return () => ws && ws.close();
  }, []);

  return whales;
}
