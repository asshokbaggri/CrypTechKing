const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function fetchAlerts() {
  const res = await fetch(`${API_BASE}/api/alerts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  const json = await res.json();
  return json.data;
}
