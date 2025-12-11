// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";        // full logo
import logoMark from "../assets/logo-mark.png"; // small mark for collapsed (optional)

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // auto-collapse for smaller screens
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth <= 980);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: "🔥" },
    { to: "/whales", label: "Whales", icon: "🐳" },
    { to: "/smartmoney", label: "Smart Money", icon: "🧠" },
    { to: "/pump", label: "Pump Scanner", icon: "🚀" },
    { to: "/alerts", label: "Alerts", icon: "⚠️" }
  ];

  const sidebarClass = `sidebar fade-in ${collapsed ? "closed" : ""} ${mobileOpen ? "mobile open" : ""}`;

  return (
    <>
      {/* Mobile toggle button (visible via CSS on small screens) */}
      <button
        className="sidebar-toggle"
        aria-label="Toggle navigation"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {/* simple chevron icon */}
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </button>

      {/* optional backdrop for mobile */}
      <div className={`sidebar-backdrop ${mobileOpen ? "visible" : ""}`} onClick={() => setMobileOpen(false)} />

      <aside className={sidebarClass} aria-label="Main navigation">
        <div className="sidebar-top">
          <div className="brand-row">
            <img
              src={collapsed ? (logoMark || logo) : logo}
              alt="CrypTechKing"
              className="brand-logo"
              onError={(e) => { e.target.onerror = null; e.target.src = logo; }}
            />
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
              onClick={() => setMobileOpen(false)} // close on mobile after click
            >
              <span className="nav-icon" aria-hidden>{l.icon}</span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <footer className="sidebar-footer">
          <div className="copyright">© {new Date().getFullYear()} CrypTechKing</div>
        </footer>
      </aside>
    </>
  );
}
