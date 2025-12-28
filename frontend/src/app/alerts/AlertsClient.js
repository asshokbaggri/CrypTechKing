'use client';

import { useEffect, useState } from 'react';
import AlertCard from '@/components/AlertCard';
import { getAlerts } from '@/lib/api';

export default function AlertsClient() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [coin, setCoin] = useState('');
  const [tier, setTier] = useState('');
  const [blockchain, setBlockchain] = useState('');

  useEffect(() => {
    setLoading(true);

    getAlerts({ coin, tier, blockchain })
      .then(res => {
        setAlerts(res.data || []);
      })
      .finally(() => setLoading(false));
  }, [coin, tier, blockchain]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Live Whale Alerts
      </h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        <select onChange={e => setCoin(e.target.value)}>
          <option value="">All Coins</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="XRP">XRP</option>
        </select>

        <select onChange={e => setTier(e.target.value)}>
          <option value="">All Tiers</option>
          <option value="WHALE">Whale</option>
          <option value="MEGA_WHALE">Mega</option>
          <option value="ULTRA_WHALE">Ultra</option>
        </select>

        <select onChange={e => setBlockchain(e.target.value)}>
          <option value="">All Chains</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="tron">Tron</option>
          <option value="ripple">Ripple</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-400">Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p className="text-center text-gray-500">No alerts found</p>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <AlertCard key={alert._id} alert={alert} />
          ))}
        </div>
      )}
    </main>
  );
}
