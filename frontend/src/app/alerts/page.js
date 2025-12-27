'use client'

import { useEffect, useState } from 'react'
import { getAlerts } from '@/lib/api'
import AlertCard from '@/components/AlertCard'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadAlerts() {
    try {
      const res = await getAlerts()
      setAlerts(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAlerts()
    const interval = setInterval(loadAlerts, 30000) // 🔄 30 sec
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="animate-pulse bg-red-500 text-white px-3 py-1 rounded-full text-sm">
          🔴 LIVE
        </span>
        <h1 className="text-3xl font-bold">
          Live Whale Alerts
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p className="text-center text-gray-400">No alerts yet...</p>
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
