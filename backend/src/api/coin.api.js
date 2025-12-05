// backend/src/api/coin.api.js

import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/:address", async (req, res) => {
    const address = req.params.address.toLowerCase();

    const whaleMoves = await db.collection("whaleTx")
        .find({ $or: [{ from: address }, { to: address }] })
        .sort({ timestamp: -1 })
        .limit(50)
        .toArray();

    const pumpData = await db.collection("pumpTrends")
        .find({ address })
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();

    res.json({
        status: "success",
        address,
        whales: whaleMoves,
        pumpHistory: pumpData
    });
});

export default router;
