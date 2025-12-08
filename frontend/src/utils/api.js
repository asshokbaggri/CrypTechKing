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

export async function getTokenDetails(address) {
    try {
        const res = await fetch(`${API}/coin/${address}`);
        return res.json();
    } catch {
        return null;
    }
}

// Global whale volume (24h)
export async function getWhaleStats() {
    try {
        const res = await fetch(`${API}/whales/stats`);
        return res.json();
    } catch {
        return null;
    }
}

// Smart Money overview summary
export async function getSmartMoneyStats() {
    try {
        const res = await fetch(`${API}/smartmoney/summary`);
        return res.json();
    } catch {
        return null;
    }
}

// Pump Strength Index (AI-driven score)
export async function getPumpStrength() {
    try {
        const res = await fetch(`${API}/pump/strength`);
        return res.json();
    } catch {
        return null;
    }
}

// Network activity (tx/s, mempool load)
export async function getNetworkActivity() {
    try {
        const res = await fetch(`${API}/network/activity`);
        return res.json();
    } catch {
        return null;
    }
}

// Smart Money Summary
export async function getSmartMoneySummary() {
    try {
        const res = await fetch(`${API}/smartmoney/summary`);
        return res.json();
    } catch {
        return null;
    }
}
