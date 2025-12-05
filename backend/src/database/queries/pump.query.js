// backend/src/database/queries/pump.query.js

import db from "../db.js";

export const savePumpTrend = async (data) => {
    try {
        await db.collection("pumpTrends").insertOne(data);
    } catch (err) {
        console.log("Pump DB Error:", err);
    }
};

export const getTrendingPumps = async () => {
    return await db.collection("pumpTrends")
        .find()
        .sort({ hypeScore: -1, timestamp: -1 })
        .limit(50)
        .toArray();
};
