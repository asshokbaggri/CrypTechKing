// backend/src/api/pump.api.js

import express from "express";
import { getTrendingPumps } from "../database/queries/pump.query.js";

const router = express.Router();

router.get("/trending", async (req, res) => {
    const data = await getTrendingPumps();
    res.json({ trending: data });
});

export default router;
