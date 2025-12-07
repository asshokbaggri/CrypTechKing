export default function StatCard({ title, value, accent }) {
    return (
        <div 
            style={{
                background: "#111217",
                border: "1px solid #1d1f26",
                borderRadius: 12,
                padding: 20,
                width: 200
            }}
        >
            <p style={{ color: "#a1a1aa", marginBottom: 5 }}>{title}</p>
            <h2 style={{ color: accent }}>{value}</h2>
        </div>
    );
}
