// backend/src/api/whales.api.js

import express from "express";
import { getLiveWhales } from "../database/queries/whales.query.js";

const router = express.Router();

router.get("/live", async (req, res) => {
    const data = await getLiveWhales();
    res.json({ whales: data });
});

export default router;
