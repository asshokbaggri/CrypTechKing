// src/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/whales", label: "Whales" },
    { to: "/smartmoney", label: "Smart Money" },
    { to: "/pump", label: "Pump Scanner" },
    { to: "/alerts", label: "Alerts" }
  ];

  return (
    <aside className="sidebar fade-in">
      <div>
        <div className="brand">CrypTechKing</div>
        <div className="small">Real-time analytics • alpha</div>
      </div>

      <nav className="nav-links" aria-label="primary">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            <span className="dot" />
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div style={{flex:1}} />

      <div style={{fontSize:12, color:"var(--muted)"}}>
        © {new Date().getFullYear()} CrypTechKing
      </div>
    </aside>
  );
}
