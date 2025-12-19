import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    if (!ENV.ALCHEMY_WEBHOOK_SECRET) {
      console.error("❌ ALCHEMY_WEBHOOK_SECRET missing");
      return res.sendStatus(500);
    }

    const signature = req.headers["x-alchemy-signature"];
    if (!signature) {
      console.error("❌ Missing Alchemy signature");
      return res.sendStatus(401);
    }

    const rawBody = req.body; // Buffer

    const expected = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (!crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    )) {
      console.error("❌ Invalid Alchemy signature");
      return res.sendStatus(401);
    }

    const payload = JSON.parse(rawBody.toString());

    console.log("✅ Alchemy webhook OK");
    console.log(payload?.event?.activity?.[0] || payload);

    return res.sendStatus(200);

  } catch (err) {
    console.error("🔥 Webhook error:", err);
    return res.sendStatus(500);
  }
});

export default router;
