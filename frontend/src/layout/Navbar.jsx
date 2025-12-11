// src/layout/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="top-brand">
        <h2 style={{margin:0}}>CrypTechKing</h2>
      </div>

      <div className="nav-right">
        <div className="live-badge">
          <span style={{fontSize:14}}>●</span>
          <span style={{fontWeight:800}}>Live Data</span>
        </div>
      </div>
    </div>
  );
}
