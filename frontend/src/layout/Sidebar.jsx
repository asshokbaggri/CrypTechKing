import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const ICONS = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  ),
  whales: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M21 12c-1.5 2-5 3-9 3s-7.5-1-9-3c0 5 4 9 9 9s9-4 9-9z"/>
      <path d="M6 7c1-1 3-2 6-2s5 1 6 2" stroke="#fff" strokeWidth="0.5" fill="none"/>
    </svg>
  ),
  smartmoney: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c2-3 6-5 7-5s5 2 7 5" />
    </svg>
  ),
  pump: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M2 12h11" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M21 6l-5 5" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6" cy="12" r="2" />
    </svg>
  ),
  alerts: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2l9 16H3L12 2z" />
      <circle cx="12" cy="18" r="1.5" />
    </svg>
  )
};

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true); // desktop default open
  const [mobileMode, setMobileMode] = useState(false);

  // links list with icons key
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { to: "/whales", label: "Whales", icon: ICONS.whales },
    { to: "/smartmoney", label: "Smart Money", icon: ICONS.smartmoney },
    { to: "/pump", label: "Pump Scanner", icon: ICONS.pump },
    { to: "/alerts", label: "Alerts", icon: ICONS.alerts }
  ];

  // auto-close on route change when mobile overlay is open
  useEffect(() => {
    if (mobileMode && window.innerWidth < 900) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // set mobile mode based on width
  useEffect(() => {
    function handleResize() {
      setMobileMode(window.innerWidth < 900);
      // default open for desktop, closed for small screens
      setOpen(window.innerWidth >= 900);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // keyboard accessible toggle (Esc closes)
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && mobileMode) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMode]);

  return (
    <>
      {/* toggle button (visible on mobile and small screens) */}
      <button
        className={`sidebar-toggle ${open ? "open" : ""}`}
        aria-expanded={open}
        aria-controls="side-primary"
        onClick={() => setOpen((s) => !s)}
        title="Toggle sidebar"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* backdrop when mobile overlay is open */}
      <div
        className={`sidebar-backdrop ${open && mobileMode ? "visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <aside
        id="side-primary"
        className={`sidebar ${open ? "open" : "closed"} ${mobileMode ? "mobile" : "desktop"}`}
      >
        <div className="sidebar-top">
          <div className="brand-row">
            <div className="brand">CrypTechKing</div>
            <button
              className="collapse-btn"
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Collapse sidebar" : "Open sidebar"}
            >
              {/* chevron */}
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <div className="small">Real-time analytics • alpha</div>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              end
            >
              <span className="icon" aria-hidden>
                {l.icon}
              </span>
              <span className="label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="copyright">© {new Date().getFullYear()} CrypTechKing</div>
        </div>
      </aside>
    </>
  );
}
