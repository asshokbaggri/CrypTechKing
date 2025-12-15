// models/WhaleTx.model.js
import mongoose from "mongoose";

const WhaleTxSchema = new mongoose.Schema({
  chain: String,
  hash: { type: String, unique: true },
  from: String,
  to: String,
  value: Number,
  timestamp: Date,
});

export default mongoose.model("WhaleTx", WhaleTxSchema);
