export default function StatCard({ label, value, icon, color = "#3ba7ff" }) {
    return (
        <div
            style={{
                background: "#111217",
                border: "1px solid #1d1f26",
                borderRadius: 14,
                padding: 22,
                width: 250,
                display: "flex",
                flexDirection: "column",
                gap: 5
            }}
        >
            <span style={{ fontSize: 28 }}>{icon}</span>
            <p style={{ color: "#a1a1aa", margin: "0 0 5px 0" }}>{label}</p>
            <h2 style={{ color, margin: 0 }}>{value}</h2>
        </div>
    );
}
