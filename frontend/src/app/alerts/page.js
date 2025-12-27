import { getAlerts } from '@/lib/api'
import AlertCard from '@/components/AlertCard'

export default async function AlertsPage() {
  const alerts = await getAlerts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚨 Live Whale Alerts
      </h1>

      {alerts.length === 0 ? (
        <p className="text-center text-gray-400">
          No alerts yet...
        </p>
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
