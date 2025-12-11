// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  // Optional: collapse automatically on small screens
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth <= 980);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/whales", label: "Whales" },
    { to: "/smartmoney", label: "Smart Money" },
    { to: "/pump", label: "Pump Scanner" },
    { to: "/alerts", label: "Alerts" }
  ];

  return (
    <aside className={`sidebar fade-in ${collapsed ? "collapsed" : ""}`} aria-label="Main navigation">
      <div className="sidebar-top">
        <div className="brand-row">
          {/* replace /logo.svg with your uploaded svg/png path in public/ or assets */}
          <img src="/logo.svg" alt="CrypTechKing" className="brand-logo" />
          <div className="brand-texts">
            <div className="brand">CrypTechKing</div>
            <div className="small">Real-time analytics • alpha</div>
          </div>
        </div>

        <button
          className="collapse-btn"
          aria-label={collapsed ? "Open menu" : "Collapse menu"}
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="chev">{collapsed ? "›" : "‹"}</span>
        </button>
      </div>

      <nav className="nav-links" aria-label="primary">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => (isActive ? "active nav-item" : "nav-item")}
            end
          >
            <span className="dot" />
            <span className="link-label">{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <footer className="sidebar-footer">
        <div className="copyright">© {new Date().getFullYear()} CrypTechKing</div>
      </footer>
    </aside>
  );
}
