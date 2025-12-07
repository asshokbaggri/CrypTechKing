// backend/src/database/queries/smartmoney.query.js

import db from "../db.js";

export const saveSmartMoneyTx = async (data) => {
    try {
        await db.collection("smartMoneyTx").insertOne(data);
        console.log("💾 Saved SmartMoney TX to DB");
    } catch (err) {
        console.log("DB Error SmartMoney:", err);
    }
};

export const updateSmartWallet = async (wallet, update) => {
    try {
        await db.collection("smartWallets").updateOne(
            { wallet },
            { $set: update, $inc: { totalTrades: 1 } },
            { upsert: true }
        );
    } catch (err) {
        console.log("DB Error SmartWallet:", err);
    }
};

export const getSmartWallet = async (wallet) => {
    return await db.collection("smartWallets").findOne({ wallet });
};
