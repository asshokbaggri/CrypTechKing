import express from "express";
import crypto from "crypto";

const router = express.Router();

/**
 * Alchemy Webhook Endpoint
 * URL: /webhooks/alchemy
 */
router.post(
  "/alchemy",
  express.raw({ type: "*/*" }), // 🔥 IMPORTANT FIX
  (req, res) => {
    try {
      console.log("🔥 WEBHOOK HIT from Alchemy");

      const signature = req.headers["x-alchemy-signature"];
      const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

      if (!signature || !secret) {
        console.error("❌ Missing signature or secret");
        return res.status(401).send("Unauthorized");
      }

      // Verify HMAC
      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(req.body);
      const digest = hmac.digest("hex");

      if (digest !== signature) {
        console.error("❌ Invalid signature");
        return res.status(401).send("Invalid signature");
      }

      const event = JSON.parse(req.body.toString());

      console.log("✅ Alchemy Event RECEIVED", {
        id: event?.id,
        type: event?.type,
      });

      // ACK immediately
      res.status(200).json({ received: true });

      // Async processing
      handleAlchemyEvent(event);
    } catch (err) {
      console.error("❌ Webhook Crash:", err);
      res.status(500).send("Server error");
    }
  }
);

export default router;

/* ---------- Business Logic ---------- */
async function handleAlchemyEvent(event) {
  try {
    if (!event?.event?.activity) return;

    for (const tx of event.event.activity) {
      console.log("🐋 TX EVENT:", tx.hash);
    }
  } catch (err) {
    console.error("❌ Event Processing Error:", err);
  }
}
