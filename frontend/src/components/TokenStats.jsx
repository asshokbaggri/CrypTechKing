// frontend/src/components/TokenStats.jsx

export default function TokenStats({ data }) {
    return (
        <div className="token-stats">
            <h2>Token Insights</h2>

            <h3>Whale Movements</h3>
            {data.whales.map((w, i) => (
                <div key={i} className="token-stat-item">
                    <p>${w.usdValue.toLocaleString()}</p>
                    <small>{new Date(w.timestamp).toLocaleTimeString()}</small>
                </div>
            ))}

            <h3>Pump History</h3>
            {data.pumpHistory.map((p, i) => (
                <div key={i} className="token-stat-item">
                    <p>Score: {p.hypeScore}</p>
                    <small>{new Date(p.timestamp).toLocaleTimeString()}</small>
                </div>
            ))}
        </div>
    );
}
