import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <nav className="navbar">
                <Link to="/">Dashboard</Link>
                <Link to="/whales">Whales</Link>
                <Link to="/smartmoney">Smart Money</Link>
                <Link to="/pump">Pump Scanner</Link>
                <Link to="/alerts">Alerts</Link>
            </nav>

            <div className="container">
                {children}
            </div>
        </div>
    );
}
