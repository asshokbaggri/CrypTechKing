const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://cryptechking-production.up.railway.app';

export async function getAlerts() {
  const res = await fetch(`${API_BASE}/api/alerts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  return res.json();
}
