// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png"; // <-- make sure file exists at this path

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false); // desktop compact
  const [mobileOpen, setMobileOpen] = useState(false); // overlay for mobile

  // collapse automatically on small screens for desktop compact behavior
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth <= 980 && window.innerWidth > 780);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // close overlay on route change (optional) - requires react-router v6 NavLink won't give router change here,
  // but if you later want to close on navigation you can add useLocation and effect.

  const links = [
    { to: "/dashboard", label: "Dashboard", emoji: "🔥" },
    { to: "/whales", label: "Whales", emoji: "🐳" },
    { to: "/smartmoney", label: "Smart Money", emoji: "🧠" },
    { to: "/pump", label: "Pump Scanner", emoji: "🚀" },
    { to: "/alerts", label: "Alerts", emoji: "⚠️" }
  ];

  return (
    <>
      {/* Mobile toggle button (top-right) */}
      <button
        className="sidebar-toggle"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((s) => !s)}
      >
        {/* a simple burger/close icon using text for simplicity — replace with svg if you want */}
        <span style={{ fontSize: 18, color: "var(--text)", fontWeight: 800 }}>
          {mobileOpen ? "✕" : "≡"}
        </span>
      </button>

      {/* backdrop when mobile overlay open */}
      <div
        className={`sidebar-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Desktop sidebar (normal element) */}
      <aside className={`sidebar ${collapsed ? "closed" : ""}`} aria-label="Main navigation">
        <div className="brand-row">
          <img src={Logo} alt="CrypTechKing" className="brand-logo" />
          <div className="brand-texts">
            <div className="brand">CrypTechKing</div>
            <div className="small">Real-time analytics • alpha</div>
          </div>
        </div>

        <button
          className="collapse-btn"
          aria-label={collapsed ? "Open menu" : "Collapse menu"}
          onClick={() => setCollapsed((s) => !s)}
        >
          <span className="chev">{collapsed ? "›" : "‹"}</span>
        </button>

        <nav className="nav-links" aria-label="primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "active nav-item" : "nav-item")}
              end
            >
              <span className="nav-icon nav-emoji" aria-hidden="true">{l.emoji}</span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <footer className="sidebar-footer">
          <div className="copyright">© {new Date().getFullYear()} CrypTechKing</div>
        </footer>
      </aside>

      {/* Mobile overlay sidebar (same markup but class 'mobile') */}
      <aside
        className={`sidebar mobile ${mobileOpen ? "open" : ""}`}
        aria-hidden={!mobileOpen}
        onClick={(e) => e.stopPropagation()} /* prevent backdrop close when clicking inside */
      >
        <div className="brand-row">
          <img src={Logo} alt="CrypTechKing" className="brand-logo" />
          <div className="brand-texts">
            <div className="brand">CrypTechKing</div>
            <div className="small">Real-time analytics • alpha</div>
          </div>
        </div>

        <button
          className="collapse-btn"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          <span style={{fontSize:18, color:"var(--text)", fontWeight:800}}>✕</span>
        </button>

        <nav className="nav-links" aria-label="mobile primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => (isActive ? "active nav-item" : "nav-item")}
              end
            >
              <span className="nav-icon nav-emoji" aria-hidden="true">{l.emoji}</span>
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
