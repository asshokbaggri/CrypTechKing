// backend/src/routes/webhook.routes.js

import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];
    const rawBody = req.body; // Buffer
    const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      console.error("❌ Missing signature or secret");
      return res.status(401).send("Unauthorized");
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Signature mismatch");
      return res.status(401).send("Invalid signature");
    }

    const payload = JSON.parse(rawBody.toString("utf8"));

    console.log("🔥 ALCHEMY WEBHOOK RECEIVED");
    console.log(JSON.stringify(payload, null, 2));

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return res.status(500).send("Webhook error");
  }
});

export default router;
