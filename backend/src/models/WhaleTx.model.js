import mongoose from "mongoose";

const WhaleTxSchema = new mongoose.Schema(
  {
    chain: {
      type: String,
      index: true
    },

    hash: {
      type: String,
      unique: true
    },

    from: String,
    to: String,

    tokenAddress: {
      type: String,
      index: true
    },

    tokenSymbol: String,

    amount: Number,
    usdValue: Number,

    blockNumber: Number,
    timestamp: Date
  },
  { timestamps: false }
);

export default mongoose.model("WhaleTx", WhaleTxSchema);
