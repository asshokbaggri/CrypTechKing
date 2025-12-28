const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://cryptechking-production.up.railway.app/api';

export async function getAlerts() {
  const res = await fetch(`${API_BASE}/alerts`, {
    cache: 'no-store', // important for live data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  return res.json();
}
