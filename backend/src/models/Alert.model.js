import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    userWallet: {
      type: String,
      index: true
    },

    chain: {
      type: String,
      enum: ["ETH", "BSC", "POLYGON"],
      required: true
    },

    tokenAddress: {
      type: String,
      required: true,
      index: true
    },

    type: {
      type: String,
      enum: ["PRICE", "WHALE_TX", "VOLUME"],
      required: true
    },

    condition: {
      type: Object,
      required: true
      /*
        example:
        { priceAbove: 1.25 }
        { amountGreaterThan: 100000 }
      */
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", AlertSchema);
