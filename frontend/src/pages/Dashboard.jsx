import { useEffect, useState } from "react";
import { getWhales, getTrending, getSmartMoneySummary } from "../utils/api";

export default function Dashboard() {
    const [latestWhales, setLatestWhales] = useState([]);
    const [trending, setTrending] = useState([]);
    const [smartSummary, setSmartSummary] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const whales = await getWhales(5); // latest 5 whales
        const trends = await getTrending(5);
        const smart = await getSmartMoneySummary();

        setLatestWhales(whales || []);
        setTrending(trends || []);
        setSmartSummary(smart || null);
    }

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🔥 CrypTechKing Dashboard</h1>

            {/* -------- SMART MONEY SUMMARY -------- */}
            <div className="card">
                <h2>🧠 Smart Money Overview</h2>
                {smartSummary ? (
                    <div style={{ marginTop: 10 }}>
                        <p>Top Buyers (24h): <strong>{smartSummary.buyers}</strong></p>
                        <p>Top Sellers (24h): <strong>{smartSummary.sellers}</strong></p>
                        <p>Active Wallets: <strong>{smartSummary.active}</strong></p>
                    </div>
                ) : (
                    <p>Loading…</p>
                )}
            </div>

            {/* -------- LIVE WHALE FEED PREVIEW -------- */}
            <div className="card">
                <h2>🐳 Latest Whale Transactions</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Chain</th>
                            <th>Amount</th>
                            <th>From → To</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {latestWhales.map((w, i) => (
                            <tr key={i}>
                                <td><span className="badge badge-whale">{w.chain}</span></td>
                                <td>{w.amount} {w.chain === "ETH" ? "ETH" : w.chain === "POLYGON" ? "MATIC" : "BNB"}</td>
                                <td>
                                    {w.from.slice(0, 6)}… → {w.to.slice(0, 6)}…
                                </td>
                                <td>{new Date(w.timestamp * 1000).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <a href="/whales" style={{ color: "#3ba7ff" }}>View full feed →</a>
            </div>

            {/* -------- TRENDING TOKENS -------- */}
            <div className="card">
                <h2>🚀 Trending Pump Coins</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Price</th>
                            <th>24h %</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trending.map((t, i) => (
                            <tr key={i}>
                                <td>
                                    <a href={`/token/${t.address}`} style={{ color: "#fff" }}>
                                        {t.symbol}
                                    </a>
                                </td>
                                <td>${t.price}</td>

                                <td style={{ color: t.change24h > 0 ? "#4ade80" : "#f87171" }}>
                                    {t.change24h}%
                                </td>

                                <td>${t.marketcap}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <a href="/pump" style={{ color: "#ff4e6a" }}>View full pump scanner →</a>
            </div>
        </div>
    );
}
