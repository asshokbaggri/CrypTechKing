import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import TableWrapper from "../components/TableWrapper";
import WhaleRow from "../components/WhaleRow";
import useLiveWhales from "../hooks/useLiveWhales";
import useSmartMoney from "../hooks/useSmartMoney";
import usePumpScanner from "../hooks/usePumpScanner";
import { getNetworkActivity } from "../utils/api";

export default function Dashboard() {
    const whales = useLiveWhales(5);
    const smart = useSmartMoney();
    const pump = usePumpScanner(5);

    const [network, setNetwork] = useState({ eth: 0, bnb: 0, polygon: 0 });

    useEffect(() => {
        loadNetwork();
        const interval = setInterval(loadNetwork, 15000);
        return () => clearInterval(interval);
    }, []);

    async function loadNetwork() {
        const res = await getNetworkActivity();
        if (res) setNetwork(res);
    }

    return (
        <div>
            <h1>🔥 CrypTechKing Dashboard</h1>

            {/* STAT CARDS */}
            <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
                <StatCard
                    icon="🐳"
                    label="Whale Volume"
                    value={smart?.volume24h || "—"}
                    color="#3ba7ff"
                />

                <StatCard
                    icon="🧠"
                    label="Smart Wallets Active"
                    value={smart?.active || "—"}
                    color="#9b6bff"
                />

                <StatCard
                    icon="🚀"
                    label="Pump Strength"
                    value={pump.length}
                    color="#ff4e6a"
                />

                <StatCard
                    icon="🌐"
                    label="Network Activity"
                    value={`ETH ${network.eth} | BNB ${network.bnb} | POLY ${network.polygon}`}
                    color="#4ade80"
                />
            </div>

            {/* LATEST WHALES */}
            <TableWrapper>
                <h2>🐳 Latest Whale Transactions</h2>
                <table style={{ width: "100%", marginTop: 10 }}>
                    <thead>
                        <tr>
                            <th>Chain</th>
                            <th>Amount</th>
                            <th>From → To</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {whales.map((tx, i) => (
                            <WhaleRow key={i} tx={tx} />
                        ))}
                    </tbody>
                </table>
            </TableWrapper>
        </div>
    );
}
