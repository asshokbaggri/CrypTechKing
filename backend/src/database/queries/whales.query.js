// backend/src/database/queries/whales.query.js

import db from "../db.js";

export const saveWhaleTx = async (data) => {
    try {
        await db.collection("whaleTx").insertOne(data);
    } catch (err) {
        console.log("DB Error:", err);
    }
};

export const getLiveWhales = async () => {
    return await db.collection("whaleTx")
        .find().sort({ timestamp: -1 }).limit(100).toArray();
};
