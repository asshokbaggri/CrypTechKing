// frontend/src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import BrandName from "../assets/brand-name.png";

export default function Sidebar() {
  const MOBILE_BREAK = 980;
  const DESKTOP_COLLAPSE_BREAK = 981;

  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Detect touch device (iOS / touch screens)
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_COLLAPSE_BREAK) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { to: "/dashboard", label: "Dashboard", emoji: "🔥" },
    { to: "/whales", label: "Whales", emoji: "🐳" },
    { to: "/smartmoney", label: "Smart Money", emoji: "🧠" },
    { to: "/pump", label: "Pump Scanner", emoji: "🚀" },
    { to: "/alerts", label: "Alerts", emoji: "⚠️" }
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen((s) => !s)}
      >
        {mobileOpen ? "✕" : "≡"}
      </button>

      <div
        className={`sidebar-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Desktop Sidebar */}
      <aside
        className={`sidebar ${collapsed ? "closed" : "open"}`}
        aria-label="Main navigation"
        {...(!isTouchDevice && {
          onMouseEnter: () => {
            if (window.innerWidth >= DESKTOP_COLLAPSE_BREAK) {
              setCollapsed(false);
            }
          },
          onMouseLeave: () => {
            if (window.innerWidth >= DESKTOP_COLLAPSE_BREAK) {
              setCollapsed(true);
            }
          }
        })}
      >
        <div className="brand-row">
          <img src={Logo} className="brand-logo" />
          <div className="brand-texts">
            <img src={BrandName} className="brand-name-img" />
          </div>
        </div>

        <nav className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav-item">
              <span className="nav-icon">{l.emoji}</span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <footer className="sidebar-footer">
          © {new Date().getFullYear()} CrypTechKing
        </footer>
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`sidebar mobile ${mobileOpen ? "open" : ""}`}>
        <div className="brand-row">
          <img src={Logo} className="brand-logo" />
          <img src={BrandName} className="brand-name-img" />
        </div>

        <nav className="nav-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="nav-item"
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-icon">{l.emoji}</span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
