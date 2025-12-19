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

    if (!ENV.ALCHEMY_WEBHOOK_SECRET) {
      console.error("❌ Missing ALCHEMY_WEBHOOK_SECRET");
      return res.sendStatus(500);
    }

    const rawBody = req.body; // Buffer

    // ✅ ALCHEMY USES BASE64 (NOT HEX)
    const expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("base64");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid Alchemy signature");
      console.log("Expected:", expectedSignature);
      console.log("Received:", signature);
      return res.sendStatus(401);
    }

    // ✅ Signature OK
    const payload = JSON.parse(rawBody.toString());

    console.log("✅ Alchemy Webhook Received");
    console.log(payload?.event?.activity?.[0] || payload);

    // 🔥 ALWAYS ACKNOWLEDGE FAST
    return res.sendStatus(200);

  } catch (err) {
    console.error("🔥 Webhook crash:", err);
    return res.sendStatus(500);
  }
});

export default router;
