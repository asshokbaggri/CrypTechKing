import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

router.post("/", (req, res) => {    // ← YEH CHANGE
  try {
    const signature = req.headers["x-alchemy-signature"];

    if (!signature) {
      console.error("❌ Missing Alchemy signature");
      return res.status(401).send("Missing signature");
    }

    const rawBody = req.body; // Buffer

    const expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid Alchemy signature");
      return res.status(401).send("Invalid signature");
    }

    const payload = JSON.parse(rawBody.toString("utf8"));

    console.log("✅ ALCHEMY WEBHOOK RECEIVED");
    console.log(JSON.stringify(payload, null, 2));

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return res.status(500).send("Webhook processing failed");
  }
});

export default router;
