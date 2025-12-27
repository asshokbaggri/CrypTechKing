export async function getAlerts() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/alerts',
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  return res.json();
}
