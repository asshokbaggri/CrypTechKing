const API_BASE =
  "https://cryptechking-production.up.railway.app/api";

export async function fetchAlerts() {
  const res = await fetch(`${API_BASE}/alerts`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return res.json();
}
