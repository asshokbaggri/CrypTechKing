import { useState } from "react";
import ChainSelector from "../components/ChainSelector.jsx";
import WhaleTable from "../components/WhaleTable.jsx";
import useLiveWhales from "../hooks/useLiveWhales.js";

export default function Whales() {
    const [chain, setChain] = useState("ALL");
    const [minAmount, setMinAmount] = useState(0);

    // 🔥 LIVE WHALE FEED (auto-refresh every 5s)
    const whales = useLiveWhales(50, chain, minAmount);

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🐳 Whale Transactions</h1>

            {/* ------- FILTER BAR ------- */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3>Filters</h3>

                <div style={{ display: "flex", gap: "20px", marginTop: 10 }}>
                    
                    {/* Chain Selector Component */}
                    <ChainSelector value={chain} onChange={setChain} />

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

            {/* ------- TABLE (Component) ------- */}
            <div className="card">
                <WhaleTable data={whales} />

                {whales.length === 0 && (
                    <p style={{ marginTop: 20, color: "#888" }}>
                        No transactions found with the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}
