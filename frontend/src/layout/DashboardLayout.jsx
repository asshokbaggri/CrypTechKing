import { Link, useLocation } from "react-router-dom";

export default function DashboardLayout({ children }) {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/", icon: "📊" },
        { name: "Whales", path: "/whales", icon: "🐳" },
        { name: "Smart Money", path: "/smartmoney", icon: "🧠" },
        { name: "Pump Scanner", path: "/pump", icon: "🚀" },
        { name: "Alerts", path: "/alerts", icon: "🔔" }
    ];

    return (
        <div style={{ display: "flex" }}>

            {/* ---------- SIDEBAR ---------- */}
            <aside style={{
                width: 250,
                height: "100vh",
                background: "#0d0d12",
                borderRight: "1px solid #1d1f26",
                padding: "20px 15px",
                position: "fixed",
                left: 0,
                top: 0
            }}>
                <h2 style={{ marginBottom: 30 }}>⚡ CrypTechKing</h2>

                {navItems.map((item, i) => {
                    const active = location.pathname === item.path;

                    return (
                        <Link
                            key={i}
                            to={item.path}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "12px 15px",
                                textDecoration: "none",
                                borderRadius: 10,
                                background: active ? "#1a1a22" : "transparent",
                                color: active ? "#3ba7ff" : "#a1a1aa",
                                marginBottom: 8,
                                transition: "0.2s"
                            }}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </aside>

            {/* ---------- MAIN CONTENT ---------- */}
            <main style={{ marginLeft: 260, padding: 30, width: "100%" }}>
                {children}
            </main>
        </div>
    );
}
