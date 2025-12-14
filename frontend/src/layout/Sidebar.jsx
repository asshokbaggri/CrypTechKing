// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png"; // adjust if your filename differs
import BrandName from "../assets/brand-name.png";

export default function Sidebar() {
  const MOBILE_BREAK = 980;
  const DESKTOP_COLLAPSE_BREAK = 981; // >= this value we use collapsed-by-default behavior

  const [collapsed, setCollapsed] = useState(true); // collapsed by default for desktop (emoji-only)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lockCollapsed, setLockCollapsed] = useState(false); // if user explicitly toggles, lock the state
  const sidebarRef = useRef(null);

  // On mount set initial collapsed based on width (collapsed on wide screens by default)
  useEffect(() => {
    const handleResizeInit = () => {
      if (window.innerWidth >= DESKTOP_COLLAPSE_BREAK) {
        setCollapsed(true);
      } else {
        // On mobile/tablet, sidebar not shown as collapsed column; keep expanded flag false
        setCollapsed(false);
      }
    };
    handleResizeInit();
    window.addEventListener("resize", handleResizeInit);
    return () => window.removeEventListener("resize", handleResizeInit);
  }, []);

  // List of links with emojis (shows emoji in collapsed state)
  const links = [
    { to: "/dashboard", label: "Dashboard", emoji: "🔥" },
    { to: "/whales", label: "Whales", emoji: "🐳" },
    { to: "/smartmoney", label: "Smart Money", emoji: "🧠" },
    { to: "/pump", label: "Pump Scanner", emoji: "🚀" },
    { to: "/alerts", label: "Alerts", emoji: "⚠️" }
  ];

  // manual collapse toggle (click) - this locks state until user clicks again
  const onToggleClick = () => {
    // if mobile overlay, close overlay instead of toggling collapse
    if (window.innerWidth <= MOBILE_BREAK) {
      setMobileOpen((s) => !s);
      return;
    }
    // desktop: toggle and lock
    setCollapsed((s) => {
      const newVal = !s;
      setLockCollapsed(true); // lock so hover doesn't override — user explicitly set preference
      // small timeout: if user toggles back to the other state quickly, we reset lock
      return newVal;
    });
  };

  return (
    <>
      {/* Mobile toggle button (top-right) */}
      <button
        className="sidebar-toggle"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((s) => !s)}
      >
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

      {/* Desktop/regular sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${collapsed ? "closed" : "open"}`}
        aria-label="Main navigation"
        onMouseEnter={() => {
          if (window.innerWidth >= DESKTOP_COLLAPSE_BREAK && !lockCollapsed) {
            setCollapsed(false);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= DESKTOP_COLLAPSE_BREAK && !lockCollapsed) {
            setCollapsed(true);
          }
        }}
      >
        <div className="brand-row">
          <img src={Logo} alt="CrypTechKing" className="brand-logo" />
          <div className="brand-texts" aria-hidden={collapsed}>
            <img
              src={BrandName}
              alt="CrypTechKing"
              className="brand-name-img"
            />
          </div>
        </div>

        <button
          className="collapse-btn"
          aria-label={collapsed ? "Open menu" : "Collapse menu"}
          onClick={onToggleClick}
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
              <span className="nav-icon nav-emoji" aria-hidden="true">
                {l.emoji}
              </span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <footer className="sidebar-footer">
          <div className="copyright">© {new Date().getFullYear()} CrypTechKing</div>
        </footer>
      </aside>

      {/* Mobile overlay sidebar (same markup but .mobile class) */}
      {/* <aside
        className={`sidebar mobile ${mobileOpen ? "open" : ""}`}
        aria-hidden={!mobileOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="brand-row">
          <img src={Logo} alt="CrypTechKing" className="brand-logo" />
          <div className="brand-texts">
            <img
              src={BrandName}
              alt="CrypTechKing"
              className="brand-name-img"
            />
          </div>
        </div>

        <button
          className="collapse-btn"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          <span style={{ fontSize: 18, color: "var(--text)", fontWeight: 800 }}>✕</span>
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
              <span className="nav-icon nav-emoji" aria-hidden="true">
                {l.emoji}
              </span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <footer className="sidebar-footer">
          <div className="copyright">© {new Date().getFullYear()} CrypTechKing</div>
        </footer>
      </aside> */}
    </>
  );
}
