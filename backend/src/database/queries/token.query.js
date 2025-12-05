import db from "../db.js";

export const saveTokenMeta = async (meta) => {
    await db.collection("tokenMeta").updateOne(
        { address: meta.address },
        { $set: meta },
        { upsert: true }
    );
};

export const getTokenMeta = async (address) => {
    return await db.collection("tokenMeta").findOne({ address });
};
