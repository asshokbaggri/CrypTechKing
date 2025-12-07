const API = import.meta.env.VITE_BACKEND_URL;

// Latest Whale TXs
export async function getWhales(limit = 50) {
    try {
        const res = await fetch(`${API}/whales?limit=${limit}`);
        return res.json();
    } catch {
        return [];
    }
}

// Trending Pump Tokens
export async function getTrending(limit = 50) {
    try {
        const res = await fetch(`${API}/pump/trending?limit=${limit}`);
        return res.json();
    } catch {
        return [];
    }
}

// Smart Money Summary
export async function getSmartMoney() {
    try {
        const res = await fetch(`${API}/smartmoney/live`);
        return res.json();
    } catch {
        return [];
    }
}

