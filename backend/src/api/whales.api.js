// backend/src/api/whales.api.js

import express from "express";
import { getLiveWhales } from "../database/queries/whales.query.js";

const router = express.Router();

// LIVE FEED
router.get("/live", async (req, res) => {
    const data = await getLiveWhales();
    res.json({
        status: "success",
        count: data.length,
        whales: data
    });
});

// HEALTH CHECK
router.get("/", (req, res) => {
    res.json({ message: "Whale API working" });
});

export default router;
