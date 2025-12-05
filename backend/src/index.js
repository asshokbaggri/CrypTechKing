// backend/src/index.js

import express from "express";
import WhaleListener from "./services/whale/whale.listener.js";
import whaleAPI from "./api/whales.api.js";

const app = express();

app.use("/api/whales", whaleAPI);

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});

// START WHALE ENGINE
WhaleListener.start();

import PumpScanner from "./services/pump/pump.scanner.js";

// Start Pump Engine
PumpScanner.start();
