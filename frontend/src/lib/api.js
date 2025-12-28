const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://cryptechking-production.up.railway.app/api';

export async function getAlerts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.coin) params.set('coin', filters.coin);
  if (filters.tier) params.set('tier', filters.tier);
  if (filters.blockchain) params.set('blockchain', filters.blockchain);

  const url =
    params.toString().length > 0
      ? `${API_BASE}/alerts?${params.toString()}`
      : `${API_BASE}/alerts`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  return res.json();
}
