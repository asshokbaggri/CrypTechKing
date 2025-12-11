// src/layout/AppLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
