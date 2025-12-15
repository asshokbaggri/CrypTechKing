import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    chain: {
      type: String,
      index: true
    },

    address: {
      type: String,
      index: true
    },

    symbol: String,
    name: String,
    decimals: Number,

    priceUsd: Number,
    liquidityUsd: Number,
    volume24h: Number,

    lastUpdated: Date
  },
  { timestamps: true }
);

export default mongoose.model("Token", TokenSchema);
