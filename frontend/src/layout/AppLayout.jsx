// src/layout/AppLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>TEST RENDER</h1>
      {children}
    </div>
  );
}
