// frontend/src/utils/api.js

const API_BASE = "http://localhost:5000/api";

export const api = {
    getWhales: async () => {
        const res = await fetch(`${API_BASE}/whales/live`);
        return await res.json();
    },

    getTrending: async () => {
        const res = await fetch(`${API_BASE}/pump/trending`);
        return await res.json();
    },

    getCoin: async (address) => {
        const res = await fetch(`${API_BASE}/coin/${address}`);
        return await res.json();
    }
};
