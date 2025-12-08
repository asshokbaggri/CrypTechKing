import { useState } from "react";
import ChainSelector from "../components/ChainSelector";
import WhaleTable from "../components/WhaleTable";
import useLiveWhales from "../hooks/useLiveWhales";
import format from "../utils/format";

export default function Whales() {
    const [chain, setChain] = useState("ALL");
    const [minAmount, setMinAmount] = useState(0);

    // LIVE FEED (auto-refresh every 5 sec)
    const whales = useLiveWhales(50);

    // FILTERING
    const filtered = whales.filter(w => {
        const byChain = chain === "ALL" || w.chain === chain;
        const byAmount = Number(w.amount) >= Number(minAmount || 0);
        return byChain && byAmount;
    });

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🐳 Whale Transactions</h1>

            {/* ------- FILTER BAR ------- */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3>Filters</h3>

                <div style={{ display: "flex", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
                    
                    {/* Chain Selector Component */}
                    <ChainSelector value={chain} onChange={setChain} />

                    {/* Min Amount Input */}
                    <input
                        type="number"
                        placeholder="Min Amount"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        style={{ padding: 8, borderRadius: 8, width: 150 }}
                    />
                </div>
            </div>

            {/* ------- WHALE TABLE ------- */}
            <div className="card">
                <WhaleTable data={filtered} />

                {filtered.length === 0 && (
                    <p style={{ marginTop: 20, color: "#888" }}>
                        No transactions found with the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}
