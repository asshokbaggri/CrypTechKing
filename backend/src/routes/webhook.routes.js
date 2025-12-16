import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];

    if (!signature) {
      console.error("❌ Missing Alchemy signature");
      return res.status(200).send("OK"); // STILL 200
    }

    const computedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    if (computedSignature !== signature) {
      console.error("❌ Invalid webhook signature");
      return res.status(200).send("OK"); // STILL 200
    }

    const payload = JSON.parse(req.body.toString());

    console.log("✅ Alchemy Webhook Received");
    console.log("Event:", payload?.event?.activityType || "unknown");

    // 👉 YAHAN APNA LOGIC DAALNA (DB / alerts / whatever)

    return res.status(200).send("OK");
  } catch (err) {
    console.error("🔥 Webhook crash:", err.message);
    return res.status(200).send("OK"); // NEVER 500
  }
});

export default router;
