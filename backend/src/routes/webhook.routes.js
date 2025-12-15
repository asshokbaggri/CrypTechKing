import express from "express";
import crypto from "crypto";

const router = express.Router();

/**
 * Alchemy Webhook
 * URL: /webhooks/alchemy
 */
router.post(
  "/alchemy",
  express.raw({ type: "*/*" }),
  (req, res) => {
    console.log("🔥 ALCHEMY WEBHOOK HIT");

    const signature = req.headers["x-alchemy-signature"];
    const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      console.log("❌ Missing signature/secret");
      return res.status(401).send("Unauthorized");
    }

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(req.body);
    const digest = hmac.digest("hex");

    if (digest !== signature) {
      console.log("❌ Invalid signature");
      return res.status(401).send("Invalid signature");
    }

    const event = JSON.parse(req.body.toString());

    console.log("✅ VERIFIED EVENT RECEIVED");
    console.log(JSON.stringify(event, null, 2));

    // ACK FAST
    res.status(200).json({ received: true });
  }
);

export default router;
