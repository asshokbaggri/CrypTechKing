const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://cryptechking-production.up.railway.app/api';

/**
 * Fetch alerts with optional filters
 * filters = { coin, tier, blockchain }
 */
export async function getAlerts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.coin) params.append('coin', filters.coin);
  if (filters.tier) params.append('tier', filters.tier);
  if (filters.blockchain) params.append('blockchain', filters.blockchain);

  const url =
    params.toString().length > 0
      ? `${API_BASE}/alerts?${params.toString()}`
      : `${API_BASE}/alerts`;

  const res = await fetch(url, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  return res.json();
}
