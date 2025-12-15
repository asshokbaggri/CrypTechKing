import WhaleTx from "../models/WhaleTx.model.js";
import { normalizeWhaleTx } from "../utils/normalizeTx.js";

export async function processWhaleTx({ chain, tx, usdValue }) {
  const data = normalizeWhaleTx({ chain, tx, usdValue });

  try {
    await WhaleTx.create(data);
    console.log(`🐋 Whale TX saved → ${chain} | ${data.value}`);
  } catch (err) {
    if (err.code === 11000) {
      // duplicate tx → ignore silently
      return;
    }
    console.error("❌ Whale Save Error:", err.message);
  }
}
