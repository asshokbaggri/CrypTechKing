import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];

    if (!signature) {
      console.error("❌ Missing signature");
      return res.status(400).send("Missing signature");
    }

    const computedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("base64"); // 🔥 VERY IMPORTANT

    if (computedSignature !== signature) {
      console.error("❌ Invalid signature");
      return res.status(401).send("Invalid signature");
    }

    const payload = JSON.parse(req.body.toString());

    console.log("🔥 ALCHEMY WEBHOOK RECEIVED");
    console.log(payload);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return res.status(500).send("Webhook failed");
  }
});

export default router;
