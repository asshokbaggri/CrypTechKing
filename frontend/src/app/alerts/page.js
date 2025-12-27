import { fetchAlerts } from '@/lib/api';
import AlertCard from '@/components/AlertCard';

export default async function AlertsPage() {
  let alerts = [];

  try {
    alerts = await fetchAlerts();
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          🚨 Live Whale Alerts
        </h1>

        {alerts.length === 0 && (
          <p className="text-zinc-400">No alerts yet...</p>
        )}

        <div className="space-y-4">
          {alerts.map(alert => (
            <AlertCard key={alert._id} alert={alert} />
          ))}
        </div>
      </div>
    </main>
  );
}
