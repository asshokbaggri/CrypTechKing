'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getAlerts } from '@/lib/api'
import AlertCard from '@/components/AlertCard'

export default function AlertsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  const coin = searchParams.get('coin') || ''
  const tier = searchParams.get('tier') || ''
  const blockchain = searchParams.get('blockchain') || ''

  useEffect(() => {
    setLoading(true)
    getAlerts({ coin, tier, blockchain })
      .then(res => setAlerts(res.data || []))
      .finally(() => setLoading(false))
  }, [coin, tier, blockchain])

  function updateFilter(key, value) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) params.set(key, value)
    else params.delete(key)

    router.push(`/alerts?${params.toString()}`)
  }

  return (
    <main className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Live Whale Alerts
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Filter real-time whale activity
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
        <select
          value={coin}
          onChange={(e) => updateFilter('coin', e.target.value)}
          className="bg-black border border-gray-700 rounded px-2 py-1"
        >
          <option value="">All Coins</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="XRP">XRP</option>
        </select>

        <select
          value={tier}
          onChange={(e) => updateFilter('tier', e.target.value)}
          className="bg-black border border-gray-700 rounded px-2 py-1"
        >
          <option value="">All Tiers</option>
          <option value="ULTRA_WHALE">ULTRA</option>
          <option value="MEGA_WHALE">MEGA</option>
          <option value="WHALE">WHALE</option>
        </select>

        <select
          value={blockchain}
          onChange={(e) => updateFilter('blockchain', e.target.value)}
          className="bg-black border border-gray-700 rounded px-2 py-1"
        >
          <option value="">All Chains</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="tron">Tron</option>
          <option value="ripple">Ripple</option>
        </select>
      </div>

      {/* Alerts */}
      {loading ? (
        <p className="text-center text-gray-500">Loading alerts…</p>
      ) : alerts.length === 0 ? (
        <div className="text-center text-gray-400 mt-12">
          No alerts found
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <AlertCard key={alert._id} alert={alert} />
          ))}
        </div>
      )}
    </main>
  )
}
