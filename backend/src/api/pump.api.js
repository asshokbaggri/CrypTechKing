// backend/src/api/pump.api.js

import express from "express";
import { getTrendingPumps } from "../database/queries/pump.query.js";

const router = express.Router();

// TRENDING PUMPS
router.get("/trending", async (req, res) => {
    const data = await getTrendingPumps();
    res.json({
        status: "success",
        count: data.length,
        trending: data
    });
});

router.get("/", (req, res) => {
    res.json({ message: "Pump API working" });
});

export default router;
