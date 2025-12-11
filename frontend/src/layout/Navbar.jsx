// src/layout/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <header className="navbar">
      <h2>CrypTechKing</h2>
      <div className="nav-right">
        <span className="status-dot" /> Live Data
      </div>
    </header>
  );
}
