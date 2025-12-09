export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">⚡ CrypTechKing</div>

            <a href="/dashboard" className="nav-link">📊 Dashboard</a>
            <a href="/whales" className="nav-link">🐋 Whales</a>
            <a href="/smartmoney" className="nav-link">🧠 Smart Money</a>
            <a href="/pump" className="nav-link">🚀 Pump Scanner</a>
            <a href="/alerts" className="nav-link">⚠ Alerts</a>
        </div>
    );
}
