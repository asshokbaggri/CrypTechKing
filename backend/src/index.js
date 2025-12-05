// backend/src/index.js

import express from "express";
import cors from "cors";

import WhaleListener from "./services/whale/whale.listener.js";
import PumpScanner from "./services/pump/pump.scanner.js";

import whaleAPI from "./api/whales.api.js";
import pumpAPI from "./api/pump.api.js";
import coinAPI from "./api/coin.api.js";

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
WhaleListener.start();
PumpScanner.start();
