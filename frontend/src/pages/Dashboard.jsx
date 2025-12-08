import { useEffect, useState } from "react";
import {
    getWhales,
    getTrending,
    getSmartMoneySummary,
    getWhaleStats,
    getSmartMoneyStats,
    getPumpStrength,
    getNetworkActivity
} from "../utils/api";

import StatCard from "../components/StatCard";
import WhaleTable from "../components/WhaleTable";
import PumpTable from "../components/PumpTable";
import SmartMoneyTable from "../components/SmartMoneyTable";
import TokenMiniChart from "../components/TokenMiniChart";

export default function Dashboard() {

    // ------------------------ STATE ------------------------
    const [latestWhales, setLatestWhales] = useState([]);
    const [trending, setTrending] = useState([]);
    const [smartSummary, setSmartSummary] = useState(null);

    const [stats, setStats] = useState({
        whaleVol: 0,
        smartActive: 0,
        pumpStrength: 0,
        network: { eth: 0, bnb: 0, polygon: 0 }
    });

    // ------------------------ LOAD DATA ------------------------
    useEffect(() => {
        loadInitial();
        loadStats();

        const interval = setInterval(loadStats, 15000);
        return () => clearInterval(interval);
    }, []);

    async function loadInitial() {
        const whales = await getWhales(5);
        const trends = await getTrending(8);
        const smart = await getSmartMoneySummary();

        setLatestWhales(whales || []);
        setTrending(trends || []);
        setSmartSummary(smart || null);
    }

    async function loadStats() {
        const whale = await getWhaleStats();
        const smart = await getSmartMoneyStats();
        const pump = await getPumpStrength();
        const network = await getNetworkActivity();

        setStats({
            whaleVol: whale?.volume24h || 0,
            smartActive: smart?.active || 0,
            pumpStrength: pump?.score || 0,
            network: network || { eth: 0, bnb: 0, polygon: 0 }
        });
    }

    // ---------------------------------------------------------
    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🔥 CrypTechKing Dashboard</h1>

            {/* ===================== HERO STATS ===================== */}
            <div style={{
                display: "flex",
                gap: 20,
                marginBottom: 30,
                flexWrap: "wrap"
            }}>
                <StatCard
                    label="Whale Volume (24h)"
                    value={`$${stats.whaleVol.toLocaleString()}`}
                    icon="🐳"
                    color="#3ba7ff"
                />

                <StatCard
                    label="Active Smart Money Wallets"
                    value={stats.smartActive}
                    icon="🧠"
                    color="#9b6bff"
                />

                <StatCard
                    label="Pump Market Strength"
                    value={`${stats.pumpStrength}/100`}
                    icon="🚀"
                    color="#ff4e6a"
                />

                <StatCard
                    label="Network Activity (tx/s)"
                    value={`ETH: ${stats.network.eth} | BNB: ${stats.network.bnb} | POLY: ${stats.network.polygon}`}
                    icon="🌐"
                    color="#4ade80"
                />
            </div>


            {/* ===================== SMART MONEY SUMMARY ===================== */}
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


            {/* ===================== LATEST WHALES ===================== */}
            <div className="card" style={{ marginTop: 25 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>🐳 Latest Whale Transactions</h2>
                    <a href="/whales" style={{ color: "#3ba7ff" }}>View full feed →</a>
                </div>

                <WhaleTable data={latestWhales} limit={5} />
            </div>


            {/* ===================== TRENDING TOKENS ===================== */}
            <div className="card" style={{ marginTop: 25 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>🚀 Trending Pump Coins</h2>
                    <a href="/pump" style={{ color: "#ff4e6a" }}>View full pump scanner →</a>
                </div>

                <PumpTable data={trending} limit={8} />
            </div>


            {/* ===================== MINI CHARTS ===================== */}
            <div className="card" style={{ marginTop: 25 }}>
                <h2>📈 Hot Token Momentum</h2>

                <div style={{
                    display: "flex",
                    gap: 20,
                    overflowX: "auto",
                    paddingBottom: 10
                }}>
                    {trending.slice(0, 5).map((t, i) => (
                        <TokenMiniChart
                            key={i}
                            symbol={t.symbol}
                            address={t.address}
                            price={t.price}
                            change24h={t.change24h}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
