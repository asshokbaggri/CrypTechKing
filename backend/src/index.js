// backend/src/index.js

import express from "express";
import cors from "cors";
import "./config/env.js";

// Services
import startETHWhaleListener from "./services/whale/eth.listener.js";
import startPolygonWhaleListener from "./services/whale/polygon.listener.js";
import startBNBWhaleListener from "./services/whale/bnb.listener.js";
import startSmartMoneyETH from "./services/smartmoney/sm.listener.eth.js";
import startSmartMoneyPOLYGON from "./services/smartmoney/sm.listener.polygon.js";
import startSmartMoneyBNB from "./services/smartmoney/sm.listener.bnb.js";
import PumpScanner from "./services/pump/pump.scanner.js";

// Routes
import whaleAPI from "./api/whales.api.js";
import pumpAPI from "./api/pump.api.js";
import coinAPI from "./api/coin.api.js";

// SAFETY — Prevent crashes
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION:", err);
});

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION:", err);
});

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/whales", whaleAPI);
app.use("/api/pump", pumpAPI);
app.use("/api/coin", coinAPI);

app.get("/", (req, res) => {
    res.json({ message: "CrypTechKing API is live 🚀" });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});

// START ENGINES
startETHWhaleListener();   // Ethereum WS live listener
startPolygonWhaleListener(); // NEW Polygon WS live listener
startBNBWhaleListener();   // 🟡 BNB listener ON
startSmartMoneyETH();      // 🚀 Smart Money ON
startSmartMoneyPOLYGON();  // 🚀 Smart Money ON
startSmartMoneyBNB();      // 🚀 Smart Money ON
PumpScanner.start();       // Pump scanner ON
