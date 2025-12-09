import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const { pathname } = useLocation();

    const navItems = [
        { icon: "📊", label: "Dashboard", path: "/dashboard" },
        { icon: "🐋", label: "Whales", path: "/whales" },
        { icon: "🧠", label: "Smart Money", path: "/smartmoney" },
        { icon: "🚀", label: "Pump Scanner", path: "/pump" },
        { icon: "⚠️", label: "Alerts", path: "/alerts" }
    ];

    return (
        <aside className="sidebar">
            <div className="logo">⚡ CrypTechKing</div>

            {navItems.map((item) => (
                <Link 
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${pathname === item.path ? "active" : ""}`}
                >
                    <span>{item.icon}</span>
                    {item.label}
                </Link>
            ))}
        </aside>
    );
}
