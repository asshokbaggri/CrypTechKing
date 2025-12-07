import db from "../db.js";

export const saveSmartTx = async (data) => {
    try {
        await db.collection("smartMoneyTx").insertOne(data);
        console.log("💾 Saved Smart Money TX");
    } catch (err) {
        console.log("DB Error:", err);
    }
};
