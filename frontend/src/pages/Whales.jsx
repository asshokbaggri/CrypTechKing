import { useEffect, useState } from "react";
import { getWhales } from "../utils/api";

export default function Whales() {
    const [whales, setWhales] = useState([]);
    const [chain, setChain] = useState("ALL");
    const [minAmount, setMinAmount] = useState(0);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000); // auto-refresh
        return () => clearInterval(interval);
    }, [chain, minAmount]);

    async function loadData() {
        const feed = await getWhales(50); // get last 50 whales
        if (!feed) return;

        let filtered = feed;

        // FILTER: chain
        if (chain !== "ALL") {
            filtered = filtered.filter(w => w.chain === chain);
        }

        // FILTER: amount
        if (minAmount > 0) {
            filtered = filtered.filter(w => Number(w.amount) >= Number(minAmount));
        }

        setWhales(filtered);
    }

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🐳 Whale Transactions</h1>

            {/* ------- FILTER BAR ------- */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3>Filters</h3>

                <div style={{ display: "flex", gap: "20px", marginTop: 10 }}>
                    {/* Chain Selector */}
                    <select
                        value={chain}
                        onChange={(e) => setChain(e.target.value)}
                        style={{ padding: 8, borderRadius: 8 }}
                    >
                        <option value="ALL">All Chains</option>
                        <option value="ETH">Ethereum</option>
                        <option value="POLYGON">Polygon</option>
                        <option value="BNB">BNB</option>
                    </select>

                    {/* Min Amount */}
                    <input
                        type="number"
                        placeholder="Min Amount"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        style={{ padding: 8, borderRadius: 8, width: 150 }}
                    />
                </div>
            </div>

            {/* ------- TABLE ------- */}
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Chain</th>
                            <th>Amount</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {whales.map((w, i) => (
                            <tr key={i}>
                                <td>
                                    <span className="badge badge-whale">
                                        {w.chain}
                                    </span>
                                </td>

                                <td>
                                    <strong>{w.amount}</strong>
                                </td>

                                <td>
                                    {w.from ? w.from.slice(0, 6) : "N/A"}…
                                </td>

                                <td>
                                    {w.to ? w.to.slice(0, 6) : "N/A"}…
                                </td>

                                <td>
                                    {new Date(w.timestamp * 1000).toLocaleTimeString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {whales.length === 0 && (
                    <p style={{ marginTop: 20, color: "#888" }}>
                        No transactions found with the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}
