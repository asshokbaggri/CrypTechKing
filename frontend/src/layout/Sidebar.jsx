// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import BrandName from "../assets/brand-name.png";

export default function Sidebar() {
  const MOBILE_BREAK = 980;
  const DESKTOP_COLLAPSE_BREAK = 981;

  // --- सुधार 1: Initial State को सिंक्रोनसली सेट करें ---
  const getInitialCollapsedState = () => {
    // Check if window is available (for SSR/Vercel) and if the screen is wide
    if (typeof window !== 'undefined' && window.innerWidth >= DESKTOP_COLLAPSE_BREAK) {
      return true; // Desktop: collapsed by default (emoji-only)
    }
    return false; // Mobile/Tablet: fully open state is the default
  };

  const [collapsed, setCollapsed] = useState(getInitialCollapsedState());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lockCollapsed, setLockCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  // --- सुधार 2: useEffect में केवल Resize Listener रखें ---
  useEffect(() => {
    // The initial check is now gone (it's in useState)
    const handleResize = () => {
      // If user has locked the state via clicking the toggle button, skip automatic resize logic
      if (lockCollapsed) return;
      
      if (window.innerWidth >= DESKTOP_COLLAPSE_BREAK) {
        setCollapsed(true); // >=981px: collapse by default
      } else {
        setCollapsed(false); // <981px: remove collapsed class
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup function: essential to prevent memory leaks, especially on mobile
    return () => window.removeEventListener("resize", handleResize);
  }, [lockCollapsed]); // Added lockCollapsed to dependency array

  // List of links (unchanged)
  const links = [
    { to: "/dashboard", label: "Dashboard", emoji: "🔥" },
    { to: "/whales", label: "Whales", emoji: "🐳" },
    { to: "/smartmoney", label: "Smart Money", emoji: "🧠" },
    { to: "/pump", label: "Pump Scanner", emoji: "🚀" },
    { to: "/alerts", label: "Alerts", emoji: "⚠️" }
  ];

  // manual collapse toggle (click) (unchanged)
  const onToggleClick = () => {
    if (window.innerWidth <= MOBILE_BREAK) {
      setMobileOpen((s) => !s);
      return;
    }
    setCollapsed((s) => {
      const newVal = !s;
      setLockCollapsed(true);
      return newVal;
    });
  };

  return (
    <>
      {/* ... Rest of the JSX markup (unchanged) ... */}
      
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
      <aside
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
      </aside>
    </>
  );
}
