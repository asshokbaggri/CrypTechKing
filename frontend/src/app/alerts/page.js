'use client';

import { useEffect, useState } from 'react';
import AlertCard from '@/components/AlertCard';
import { getAlerts } from '@/lib/api';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [lastId, setLastId] = useState(null);

  async function loadAlerts() {
    const res = await getAlerts();
    const data = res.data || [];

    if (data.length && data[0]._id !== lastId) {
      setLastId(data[0]._id);
    }

    setAlerts(data);
  }

  useEffect(() => {
    loadAlerts(); // initial
    const interval = setInterval(loadAlerts, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">🚨 Live Whale Alerts</h1>
        <span className="px-3 py-1 text-xs rounded-full bg-red-600 animate-pulse">
          LIVE
        </span>
      </div>

      {alerts.length === 0 ? (
        <p className="text-center text-gray-400">No alerts yet...</p>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <AlertCard
              key={alert._id}
              alert={alert}
              isNew={alert._id === lastId}
            />
          ))}
        </div>
      )}
    </main>
  );
}
