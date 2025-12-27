const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getAlerts() {
  const res = await fetch(`${API_BASE}/alerts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  return res.json();
}
