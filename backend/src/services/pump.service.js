import Token from "../models/Token.model.js";

const scanPumps = async (limit = 50) => {
  return Token.find({
    change24h: { $gte: 10 }, // 🔥 pump threshold
  })
    .sort({ change24h: -1 })
    .limit(limit)
    .lean();
};

export default {
  scanPumps,
};
