// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; // <-- make sure file exists at this path

export default function Sidebar() {
  const [closed, setClosed] = useState(false);       // desktop compact
  const [mobileOpen, setMobileOpen] = useState(false);// mobile overlay

  // Auto-close on small screens
  useEffect(() => {
    const onResize = () => {
      setClosed(window.innerWidth <= 980); // start compact on small widths
      if (window.innerWidth > 980) setMobileOpen(false);
    };
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

  // toggle compact (desktop) or mobile overlay
  const toggleCompact = () => setClosed((s) => !s);
  const toggleMobile = () => setMobileOpen((s) => !s);

  return (
    <>
      {/* mobile toggle button (visible by CSS media query) */}
      <button
        className="sidebar-toggle"
        aria-label="Open menu"
        onClick={toggleMobile}
      >
        {/* simple burger icon */}
        <svg width="18" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      {/* backdrop for mobile overlay */}
      <div
        className={`sidebar-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`sidebar fade-in ${closed ? "closed" : ""} ${mobileOpen ? "mobile open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-top">
          <div className="brand-row">
            <img src={logo} alt="CrypTechKing" className="brand-logo" />
            <div className="brand-texts">
              <div className="brand">CrypTechKing</div>
              <div className="small">Real-time analytics • alpha</div>
            </div>
          </div>

          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <button
              className="collapse-btn"
              aria-label={closed ? "Open menu" : "Collapse menu"}
              onClick={toggleCompact}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d={closed ? "M8 5l8 7-8 7" : "M16 5l-8 7 8 7"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* mobile close button (visible on overlay) */}
            <button
              className="collapse-btn"
              style={{display: mobileOpen ? 'inline-flex' : 'none'}}
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>

        <nav className="nav-links" aria-label="primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "active nav-item" : "nav-item")}
              end
              onClick={() => setMobileOpen(false)} // close overlay on nav click (mobile)
            >
              <span className="nav-emoji" aria-hidden>{l.icon}</span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" style={{flex:1}} />

        <footer className="sidebar-footer">
          <div className="copyright">© {new Date().getFullYear()} CrypTechKing</div>
        </footer>
      </aside>
    </>
  );
}
