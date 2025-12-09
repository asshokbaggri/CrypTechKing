const API = import.meta.env.VITE_API_URL;

// SAFETY: fallback if env missing
const BASE = API || "http://localhost:5000";

async function get(path) {
    try {
        const res = await fetch(`${BASE}${path}`);
        return await res.json();
    } catch (err) {
        console.log("API ERROR:", err);
        return null;
    }
}

// ---------- WHALES ----------
export async function getWhales(limit = 50) {
    return get(`/api/whales?limit=${limit}`);
}

// ---------- SMART MONEY ----------
export async function getSmartMoneySummary() {
    return get("/api/smart/summary");
}

// ---------- PUMP SCANNER ----------
export async function getTrending(limit = 50) {
    return get(`/api/pump?limit=${limit}`);
}

// ---------- NETWORK ACTIVITY ----------
export async function getNetworkActivity() {
    return get("/api/network/activity");
}

export default {
    getWhales,
    getSmartMoneySummary,
    getTrending,
    getNetworkActivity,
};
