// src/layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="brand">CrypTechKing</h3>
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/whales">Whales</Link>
        <Link to="/smartmoney">Smart Money</Link>
        <Link to="/pump">Pump Scanner</Link>
        <Link to="/alerts">Alerts</Link>
      </nav>
    </aside>
  );
}
