// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; // ← Vite-friendly import (path you gave)

export default function Sidebar() {
  const [closed, setClosed] = useState(false);

  // collapse automatically on small screens (initial + resize)
  useEffect(() => {
    const onResize = () => setClosed(window.innerWidth <= 980);
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
    <aside className={`sidebar fade-in ${closed ? "closed" : ""}`} aria-label="Main navigation">
      <div className="sidebar-top">
        <div className="brand-row">
          {/* using imported logo from src/assets — keeps Vite happy */}
          <img src={logo} alt="CrypTechKing logo" className="brand-logo" />
          <div className="brand-texts">
            <div className="brand">CrypTechKing</div>
            <div className="small">Real-time analytics • alpha</div>
          </div>
        </div>

        <button
          className="collapse-btn"
          aria-label={closed ? "Open menu" : "Collapse menu"}
          onClick={() => setClosed((s) => !s)}
        >
          <span className="chev" aria-hidden>
            {closed ? "›" : "‹"}
          </span>
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
            <span className="icon" aria-hidden>
              {/* Optional: replace with inline SVG icons later */}
              🔹
            </span>
            <span className="label link-label">{l.label}</span>
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
