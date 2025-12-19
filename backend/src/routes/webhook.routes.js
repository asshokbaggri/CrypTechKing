import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];
    if (!signature) {
      return res.status(401).send("Missing signature");
    }

    if (!ENV.ALCHEMY_WEBHOOK_SECRET) {
      console.error("❌ ALCHEMY_WEBHOOK_SECRET missing");
      return res.sendStatus(500);
    }

    const rawBody = req.body; // MUST be Buffer

    const expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid signature");
      return res.status(401).send("Invalid signature");
    }

    const payload = JSON.parse(rawBody.toString());

    console.log("✅ Alchemy Webhook OK");
    console.log(payload?.event?.activity?.[0] || payload);

    // 🔥 ALWAYS ACK FAST
    return res.sendStatus(200);
  } catch (err) {
    console.error("🔥 Webhook error:", err);
    return res.sendStatus(200); // ❗ NEVER let Alchemy retry endlessly
  }
});

export default router;
