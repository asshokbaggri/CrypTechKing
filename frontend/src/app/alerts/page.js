import { getAlerts } from '@/lib/api';
import AlertCard from '@/components/AlertCard';

// ✅ Auto refresh every 30 seconds (SERVER SIDE)
export const revalidate = 30;

export default async function AlertsPage() {
  const res = await getAlerts();
  const alerts = res?.data || [];

  return (
    <main className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-bold">
            Live Whale Alerts
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-gray-500">
          Auto-refreshes every 30 seconds
        </p>
      </div>

      {/* Alerts */}
      {alerts.length === 0 ? (
        <div className="text-center text-gray-400 mt-12">
          <p className="text-sm">No alerts yet…</p>
          <p className="text-xs mt-2 text-gray-500">
            Waiting for large on-chain movements 🐳
          </p>
        </div>
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
