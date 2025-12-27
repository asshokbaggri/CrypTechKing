const API_BASE = process.env.NEXT_PUBLIC_API_URL

export async function getAlerts() {
  const res = await fetch(`${API_BASE}/alerts`, {
    cache: 'no-store'
  })
  return res.json()
}
