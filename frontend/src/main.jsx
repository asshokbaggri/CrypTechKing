// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// IMPORT GLOBAL STYLES (important)
import "./styles/global.css"; // create this file if missing

const root = createRoot(document.getElementById("root"));
root.render(<App />);
