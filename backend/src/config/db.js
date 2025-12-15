import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URL) {
      throw new Error("❌ MONGO_URL missing");
    }

    await mongoose.connect(ENV.MONGO_URL, {
      autoIndex: true
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
