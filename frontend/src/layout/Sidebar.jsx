// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import BrandName from "../assets/brand-name.png";

export default function Sidebar() {

  /* ======================
     SAFE DEVICE CHECKS
  ====================== */
  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 980px)").matches;

  const isDesktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 981px)").matches;

  /* ======================
     STATE
  ====================== */
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ======================
     INITIAL MOUNT (iOS SAFE)
  ====================== */
  useEffect(() => {
    setMounted(true);

    if (isDesktop()) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, []);

  /* ======================
     NAV LINKS
  ====================== */
  const links = [
    { to: "/dashboard", label: "Dashboard", emoji: "🔥" },
    { to: "/whales", label: "Whales", emoji: "🐳" },
    { to: "/smartmoney", label: "Smart Money", emoji: "🧠" },
    { to: "/pump", label: "Pump Scanner", emoji: "🚀" },
    { to: "/alerts", label: "Alerts", emoji: "⚠️" }
  ];

  /* ======================
     TOGGLE HANDLER
  ====================== */
  const onToggleClick = () => {
    if (isMobile()) {
      setMobileOpen((v) => !v);
      return;
    }
    setCollapsed((v) => !v);
  };

  /* ======================
     BLOCK RENDER UNTIL SAFE
     (PREVENT iOS BLANK)
  ====================== */
  if (!mounted) return null;

  return (
    <>
      {/* ================= MOBILE TOGGLE ================= */}
      <button
        className="sidebar-toggle"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span style={{ fontSize: 18, fontWeight: 800 }}>
          {mobileOpen ? "✕" : "≡"}
        </span>
      </button>

      {/* ================= MOBILE BACKDROP ================= */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop visible"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      {isDesktop() && (
        <aside
          className={`sidebar ${collapsed ? "closed" : "open"}`}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <div className="brand-row">
            <img src={Logo} alt="CrypTechKing" className="brand-logo" />
            {!collapsed && (
              <div className="brand-texts">
                <img src={BrandName} alt="CrypTechKing" className="brand-name-img" />
              </div>
            )}
          </div>

          <nav className="nav-links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  isActive ? "active nav-item" : "nav-item"
                }
                end
              >
                <span className="nav-icon nav-emoji">{l.emoji}</span>
                {!collapsed && <span className="link-label">{l.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-spacer" />

          <footer className="sidebar-footer">
            © {new Date().getFullYear()} CrypTechKing
          </footer>
        </aside>
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      {isMobile() && mobileOpen && (
        <aside className="sidebar mobile open">
          <div className="brand-row">
            <img src={Logo} alt="CrypTechKing" className="brand-logo" />
            <div className="brand-texts">
              <img src={BrandName} alt="CrypTechKing" className="brand-name-img" />
            </div>
          </div>

          <nav className="nav-links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive ? "active nav-item" : "nav-item"
                }
                end
              >
                <span className="nav-icon nav-emoji">{l.emoji}</span>
                <span className="link-label">{l.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-spacer" />

          <footer className="sidebar-footer">
            © {new Date().getFullYear()} CrypTechKing
          </footer>
        </aside>
      )}
    </>
  );
}
