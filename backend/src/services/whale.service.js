import WhaleTx from "../models/WhaleTx.model.js";

const getLatestWhales = async (limit = 20) => {
  return WhaleTx.find()
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean();
};

const saveWhaleTx = async (tx) => {
  return WhaleTx.create(tx);
};

export default {
  getLatestWhales,
  saveWhaleTx,
};
