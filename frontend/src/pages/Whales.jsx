import { useState } from "react";
import WhaleFeed from "../components/WhaleFeed";
import useLiveWhales from "../hooks/useLiveWhales";

export default function Whales() {
    const [chain, setChain] = useState("ALL");
    const [min, setMin] = useState(0);

    const whales = useLiveWhales(50);

    const filtered = whales.filter((w) => {
        if (chain !== "ALL" && w.chain !== chain) return false;
        if (min > 0 && Number(w.amount) < Number(min)) return false;
        return true;
    });

    return (
        <div>
            <h1>🐳 Whale Transactions</h1>

            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                <select value={chain} onChange={(e) => setChain(e.target.value)}>
                    <option value="ALL">All Chains</option>
                    <option value="ETH">Ethereum</option>
                    <option value="BNB">BNB</option>
                    <option value="POLYGON">Polygon</option>
                </select>

                <input
                    type="number"
                    placeholder="Min Amount"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                />
            </div>

            <WhaleFeed data={filtered} />
        </div>
    );
}
