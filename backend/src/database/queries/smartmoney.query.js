// backend/src/database/queries/smartmoney.query.js

import db from "../db.js";

export const saveSmartTx = async (data) => {
    try {
        await db.collection("smartMoneyTx").insertOne(data);
        console.log("💾 Saved SmartMoney TX to DB");
    } catch (err) {
        console.log("DB Error:", err);
    }
};

export const updateWalletStats = async (wallet, stats) => {
    await db.collection("smartWallets").updateOne(
        { wallet },
        { $set: stats },
        { upsert: true }
    );
};
