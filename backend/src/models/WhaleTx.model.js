import mongoose from "mongoose";

const whaleTxSchema = new mongoose.Schema(
  {
    chain: { type: String, required: true }, // ETH / BNB / POLYGON
    hash: { type: String, required: true, unique: true },

    from: { type: String, index: true },
    to: { type: String, index: true },

    value: { type: Number, required: true }, // ETH / BNB amount
    usdValue: { type: Number },

    blockNumber: Number,
    timestamp: Date,

    source: {
      type: String,
      default: "alchemy-webhook"
    }
  },
  { timestamps: true }
);

// 🚫 HARD DUPLICATE PROTECTION
whaleTxSchema.index({ chain: 1, hash: 1 }, { unique: true });

export default mongoose.model("WhaleTx", whaleTxSchema);
