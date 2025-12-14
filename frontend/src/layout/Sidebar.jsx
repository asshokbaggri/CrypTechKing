// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import BrandName from "../assets/brand-name.png";

export default function Sidebar() {
  const MOBILE_BREAK = 980;
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // detect screen size (single source of truth)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAK);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const links = [
    { to: "/dashboard", label: "Dashboard", emoji: "🔥" },
    { to: "/whales", label: "Whales", emoji: "🐳" },
    { to: "/smartmoney", label: "Smart Money", emoji: "🧠" },
    { to: "/pump", label: "Pump Scanner", emoji: "🚀" },
    { to: "/alerts", label: "Alerts", emoji: "⚠️" }
  ];

  /* =========================
     DESKTOP SIDEBAR (STICKY)
     ========================= */
  const DesktopSidebar = () => (
    <aside className="sidebar desktop" aria-label="Main navigation">
      <div className="brand-row">
        <img src={Logo} alt="CrypTechKing" className="brand-logo" />
        <img src={BrandName} alt="CrypTechKing" className="brand-name-img" />
      </div>

      <nav className="nav-links">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">{l.emoji}</span>
            <span className="link-label">{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <footer className="sidebar-footer">
        © {new Date().getFullYear()} CrypTechKing
      </footer>
    </aside>
  );

  /* =========================
     MOBILE OVERLAY SIDEBAR
     ========================= */
  const MobileSidebar = () => (
    <>
      {/* toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        ≡
      </button>

      {mobileOpen && (
        <>
          {/* backdrop */}
          <div
            className="sidebar-backdrop visible"
            onClick={() => setMobileOpen(false)}
          />

          {/* overlay */}
          <aside className="sidebar mobile open" aria-label="Mobile navigation">
            <div className="brand-row">
              <img src={Logo} alt="CrypTechKing" className="brand-logo" />
              <img
                src={BrandName}
                alt="CrypTechKing"
                className="brand-name-img"
              />
            </div>

            <nav className="nav-links">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                >
                  <span className="nav-icon">{l.emoji}</span>
                  <span className="link-label">{l.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  );

  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
}
