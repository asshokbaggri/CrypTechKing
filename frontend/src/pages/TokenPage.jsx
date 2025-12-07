import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTokenDetails } from "../utils/api";

export default function TokenPage() {
    const { address } = useParams();
    const [token, setToken] = useState(null);

    useEffect(() => {
        load();
    }, [address]);

    async function load() {
        const data = await getTokenDetails(address);
        setToken(data);
    }

    if (!token) return <p>Loading token data...</p>;

    return (
        <div>
            <h1 style={{ marginBottom: 10 }}>{token.symbol} — Token Overview</h1>
            <p style={{ color: "#888" }}>{address}</p>

            {/* -------- TOKEN STATS CARD -------- */}
            <div className="card" style={{ marginTop: 20 }}>
                <h2>📊 Market Stats</h2>
                <div style={{ display: "flex", gap: 50, marginTop: 15 }}>
                    <div>
                        <p>Price:</p>
                        <h3>${token.price}</h3>
                    </div>

                    <div>
                        <p>24h Change:</p>
                        <h3 style={{ color: token.change24h > 0 ? "#4ade80" : "#f87171" }}>
                            {token.change24h}%
                        </h3>
                    </div>

                    <div>
                        <p>Liquidity:</p>
                        <h3>${token.liquidity}</h3>
                    </div>

                    <div>
                        <p>24h Volume:</p>
                        <h3>${token.volume24h}</h3>
                    </div>

                    <div>
                        <p>Market Cap:</p>
                        <h3>${token.marketcap}</h3>
                    </div>

                    <div>
                        <p>Risk Score:</p>
                        <h3 style={{ color: token.risk < 40 ? "#f87171" : token.risk < 70 ? "#fbbf24" : "#4ade80" }}>
                            {token.risk}/100
                        </h3>
                    </div>
                </div>
            </div>

            {/* -------- WHALE ACTIVITY -------- */}
            <div className="card">
                <h2>🐳 Whale Activity</h2>

                {token.whales.length === 0 ? (
                    <p>No whale buys detected yet.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Wallet</th>
                                <th>Amount</th>
                                <th>Chain</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {token.whales.map((w, i) => (
                                <tr key={i}>
                                    <td>{w.from.slice(0,6)}…{w.from.slice(-4)}</td>
                                    <td>{w.value}</td>
                                    <td><span className="badge badge-whale">{w.chain}</span></td>
                                    <td>{new Date(w.timestamp * 1000).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* -------- SMART MONEY ACTIVITY -------- */}
            <div className="card">
                <h2>🧠 Smart Money Activity</h2>

                {token.smartmoney.length === 0 ? (
                    <p>No smart money entries detected yet.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Wallet</th>
                                <th>Type</th>
                                <th>Score</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {token.smartmoney.map((s, i) => (
                                <tr key={i}>
                                    <td>{s.wallet.slice(0,6)}…{s.wallet.slice(-4)}</td>
                                    <td>{s.label}</td>
                                    <td>{s.score}</td>
                                    <td>{s.amount}</td>
                                    <td>{new Date(s.timestamp * 1000).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}
