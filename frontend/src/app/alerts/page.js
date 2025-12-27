import { getAlerts } from '@/lib/api';
import AlertCard from '@/components/AlertCard';

// ✅ Auto refresh every 30 seconds (SERVER SIDE)
export const revalidate = 30;

export default async function AlertsPage() {
  const res = await getAlerts();
  const alerts = res?.data || [];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚨 Live Whale Alerts
      </h1>

      <p className="text-center text-xs text-gray-500 mb-4">
        Auto-refreshes every 30 seconds
      </p>

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
