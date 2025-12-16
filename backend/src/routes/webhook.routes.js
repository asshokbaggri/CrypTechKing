import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];
    if (!signature) {
      console.error("❌ Missing Alchemy signature");
      return res.sendStatus(401);
    }

    const rawBody = req.body; // Buffer (VERY IMPORTANT)

    const expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid Alchemy signature");
      return res.sendStatus(401);
    }

    // ✅ Signature OK
    const payload = JSON.parse(rawBody.toString());

    console.log("✅ Alchemy Webhook Received");
    console.log(payload?.event?.activity?.[0] || payload);

    // 🔥 ALWAYS ACKNOWLEDGE
    return res.sendStatus(200);

  } catch (err) {
    console.error("🔥 Webhook crash:", err);
    return res.sendStatus(500);
  }
});

export default router;
