import { useEffect, useState } from "react";
import { getTrending } from "../utils/api";

export default function Pump() {
    const [tokens, setTokens] = useState([]);
    const [minScore, setMinScore] = useState(0);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 7000); // auto-refresh
        return () => clearInterval(interval);
    }, [minScore]);

    async function loadData() {
        const data = await getTrending(50); // get top 50 trends
        if (!data) return;

        let filtered = data;

        // Hype score filter
        if (minScore > 0) {
            filtered = filtered.filter(t => Number(t.hypeScore) >= Number(minScore));
        }

        setTokens(filtered);
    }

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🚀 Pump Scanner</h1>

            {/* ---------- FILTERS ---------- */}
            <div className="card">
                <h3>Filters</h3>

                <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                    <input
                        type="number"
                        placeholder="Min Hype Score"
                        value={minScore}
                        onChange={(e) => setMinScore(e.target.value)}
                        style={{ padding: 8, borderRadius: 8, width: 180 }}
                    />
                </div>
            </div>

            {/* ---------- TOKENS TABLE ---------- */}
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Price</th>
                            <th>1h %</th>
                            <th>24h Volume</th>
                            <th>Liquidity</th>
                            <th>Hype Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tokens.map((t, i) => (
                            <tr key={i}>
                                <td>
                                    <a 
                                        href={`/token/${t.address}`} 
                                        style={{ color: "#fff" }}
                                    >
                                        {t.symbol}
                                    </a>
                                </td>

                                <td>${t.price}</td>

                                <td style={{ color: t.priceChange1h > 0 ? "#4ade80" : "#f87171" }}>
                                    {t.priceChange1h}%
                                </td>

                                <td>${t.volume24h}</td>

                                <td>${t.liquidity}</td>

                                <td>
                                    <span 
                                        className="badge badge-pump"
                                        style={{ 
                                            background: t.hypeScore > 80 ? "#10b981" :
                                                        t.hypeScore > 60 ? "#f59e0b" :
                                                        "#ef4444",
                                            color: "#000"
                                        }}
                                    >
                                        {t.hypeScore}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {tokens.length === 0 && (
                    <p style={{ marginTop: 20, color: "#888" }}>
                        No trending tokens for selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}
