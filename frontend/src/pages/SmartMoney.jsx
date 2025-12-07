import { useEffect, useState } from "react";
import { getSmartMoney } from "../utils/api";

export default function SmartMoney() {
    const [wallets, setWallets] = useState([]);
    const [chain, setChain] = useState("ALL");
    const [type, setType] = useState("ALL");
    const [minScore, setMinScore] = useState(0);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 7000); // refresh every 7 sec
        return () => clearInterval(interval);
    }, [chain, type, minScore]);

    async function loadData() {
        const data = await getSmartMoney();
        if (!data) return;

        let filtered = data;

        // Filter by chain
        if (chain !== "ALL") {
            filtered = filtered.filter(w => w.chain === chain);
        }

        // Filter by type/label
        if (type !== "ALL") {
            filtered = filtered.filter(w => w.label === type);
        }

        // Filter by score
        if (minScore > 0) {
            filtered = filtered.filter(w => Number(w.score) >= Number(minScore));
        }

        setWallets(filtered);
    }

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🧠 Smart Money Activity</h1>

            {/* ---------- FILTERS ---------- */}
            <div className="card">
                <h3>Filters</h3>

                <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                    {/* Chain */}
                    <select value={chain} onChange={(e) => setChain(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
                        <option value="ALL">All Chains</option>
                        <option value="ETH">Ethereum</option>
                        <option value="POLYGON">Polygon</option>
                        <option value="BNB">BNB</option>
                    </select>

                    {/* Wallet Type */}
                    <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
                        <option value="ALL">All Types</option>
                        <option value="Fund">Fund</option>
                        <option value="Whale">Whale</option>
                        <option value="Sniper">Sniper</option>
                        <option value="Degen">Degen</option>
                        <option value="AirdropHunter">Airdrop Hunter</option>
                    </select>

                    {/* Score */}
                    <input 
                        type="number"
                        placeholder="Min Score"
                        value={minScore}
                        onChange={(e) => setMinScore(e.target.value)}
                        style={{ padding: 8, borderRadius: 8, width: 150 }}
                    />
                </div>
            </div>

            {/* ---------- TABLE ---------- */}
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Wallet</th>
                            <th>Label</th>
                            <th>Score</th>
                            <th>Chain</th>
                            <th>Recent Buy</th>
                            <th>Recent Sell</th>
                            <th>Last Active</th>
                        </tr>
                    </thead>

                    <tbody>
                        {wallets.map((w, i) => (
                            <tr key={i}>
                                <td>{w.address.slice(0, 6)}…{w.address.slice(-4)}</td>

                                <td>
                                    <span className="badge badge-smart">{w.label}</span>
                                </td>

                                <td style={{ color: w.score >= 80 ? "#4ade80" : "#facc15" }}>
                                    <strong>{w.score}</strong>
                                </td>

                                <td>
                                    <span className="badge badge-whale">{w.chain}</span>
                                </td>

                                <td>{w.recentBuy ? w.recentBuy.symbol : "—"}</td>

                                <td>{w.recentSell ? w.recentSell.symbol : "—"}</td>

                                <td>{new Date(w.lastActive * 1000).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {wallets.length === 0 && (
                    <p style={{ marginTop: 20, color: "#888" }}>
                        No smart money activity for selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}
