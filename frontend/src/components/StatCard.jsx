export default function StatCard({ icon, label, value, color }) {
    return (
        <div
            style={{
                background: "#12161f",
                padding: "18px",
                borderRadius: "12px",
                flex: "1",
                minWidth: "210px",
                borderLeft: `4px solid ${color}`,
            }}
        >
            <div style={{ fontSize: 28 }}>{icon}</div>
            <div style={{ fontSize: 14, color: "#9aa0a6" }}>{label}</div>
            <div style={{ fontSize: 22, marginTop: 4, fontWeight: 600 }}>
                {value}
            </div>
        </div>
    );
}
