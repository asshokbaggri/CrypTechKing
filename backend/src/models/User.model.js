import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },

    telegramId: {
      type: String,
      index: true
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
