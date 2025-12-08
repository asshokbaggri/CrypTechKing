import { useState } from "react";
import ChainSelector from "../components/ChainSelector";
import WhaleTable from "../components/WhaleTable";
import useLiveWhales from "../hooks/useLiveWhales";

export default function Whales() {
    const [chain, setChain] = useState("ALL");
    const [minAmount, setMinAmount] = useState(0);

    const whales = useLiveWhales(50); // auto-refresh every 5 secs

    // APPLY FILTERS
    const filtered = whales.filter(w => {
        if (chain !== "ALL" && w.chain !== chain) return false;
        if (minAmount > 0 && Number(w.amount) < Number(minAmount)) return false;
        return true;
    });

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🐳 Whale Transactions</h1>

            {/* -------- FILTER BAR -------- */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3>Filters</h3>

                <div style={{ display: "flex", gap: 20, marginTop: 15 }}>
                    
                    {/* Chain Dropdown */}
                    <ChainSelector value={chain} onChange={(val) => setChain(val)} />

                    {/* Min Amount Filter */}
                    <input
                        type="number"
                        placeholder="Min Amount"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        style={{
                            padding: 8,
                            borderRadius: 8,
                            width: 140,
                            background: "#111",
                            border: "1px solid #333",
                            color: "#fff",
                        }}
                    />
                </div>
            </div>

            {/* -------- TABLE -------- */}
            <div className="card">
                <WhaleTable data={filtered} />

                {filtered.length === 0 && (
                    <p style={{ marginTop: 20, color: "#999" }}>
                        No transactions found with the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}
