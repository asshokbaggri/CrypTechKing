import { useState } from "react";

export default function Alerts() {
    const [minWhaleAmount, setMinWhaleAmount] = useState(50);
    const [minHypeScore, setMinHypeScore] = useState(80);
    const [walletScore, setWalletScore] = useState(70);

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>🔔 Alerts & Automations</h1>

            {/* -------- TELEGRAM SETUP -------- */}
            <div className="card">
                <h2>📩 Telegram Alerts</h2>
                <p style={{ color: "#a1a1aa" }}>
                    Receive instant whale, pump & smart money alerts directly in your Telegram.
                </p>

                <button 
                    style={{
                        marginTop: 15,
                        padding: "10px 20px",
                        borderRadius: "10px",
                        background: "#3ba7ff",
                        color: "#000",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Connect Telegram
                </button>
            </div>

            {/* -------- X/TWITTER SETUP -------- */}
            <div className="card">
                <h2>🐦 X / Twitter Alerts</h2>
                <p style={{ color: "#a1a1aa" }}>
                    Auto-post whales, pumps & smart money signals to your X account.
                </p>

                <button 
                    style={{
                        marginTop: 15,
                        padding: "10px 20px",
                        borderRadius: "10px",
                        background: "#9b6bff",
                        color: "#000",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Connect X Account
                </button>
            </div>

            {/* -------- CUSTOM ALERT BUILDER -------- */}
            <div className="card">
                <h2>🛠 Create Your Custom Alerts</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 10 }}>

                    {/* Whale Alert */}
                    <div>
                        <h4>🐳 Whale Alert</h4>
                        <p style={{ color: "#a1a1aa" }}>Notify when a whale transfers above a specific amount.</p>

                        <input
                            type="number"
                            value={minWhaleAmount}
                            onChange={(e) => setMinWhaleAmount(e.target.value)}
                            style={{ padding: 10, borderRadius: 8 }}
                        />

                        <button style={{ marginLeft: 20, padding: "8px 15px", borderRadius: 8 }}>
                            Save Trigger
                        </button>
                    </div>

                    {/* Pump Alert */}
                    <div>
                        <h4>🚀 Pump Alert</h4>
                        <p style={{ color: "#a1a1aa" }}>Notify when hype score crosses a threshold.</p>

                        <input
                            type="number"
                            value={minHypeScore}
                            onChange={(e) => setMinHypeScore(e.target.value)}
                            style={{ padding: 10, borderRadius: 8 }}
                        />

                        <button style={{ marginLeft: 20, padding: "8px 15px", borderRadius: 8 }}>
                            Save Trigger
                        </button>
                    </div>

                    {/* Smart Money Alert */}
                    <div>
                        <h4>🧠 Smart Money Alert</h4>
                        <p style={{ color: "#a1a1aa" }}>Notify when a wallet with high score takes action.</p>

                        <input
                            type="number"
                            value={walletScore}
                            onChange={(e) => setWalletScore(e.target.value)}
                            style={{ padding: 10, borderRadius: 8 }}
                        />

                        <button style={{ marginLeft: 20, padding: "8px 15px", borderRadius: 8 }}>
                            Save Trigger
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}
