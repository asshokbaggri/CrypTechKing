import express from "express";
import crypto from "crypto";

const router = express.Router();

/**
 * Alchemy Webhook Endpoint
 * URL: /webhooks/alchemy
 */
router.post(
  "/alchemy",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      const signature = req.headers["x-alchemy-signature"];
      const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

      if (!signature || !secret) {
        return res.status(401).send("Unauthorized");
      }

      // Verify HMAC signature
      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(req.body);
      const digest = hmac.digest("hex");

      if (digest !== signature) {
        return res.status(401).send("Invalid signature");
      }

      const event = JSON.parse(req.body.toString());

      // 🔥 IMPORTANT: ACK FAST
      res.status(200).json({ received: true });

      // Async processing
      handleAlchemyEvent(event);
    } catch (err) {
      console.error("Webhook Error:", err.message);
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
      const valueEth = Number(tx.value || 0) / 1e18;

      if (valueEth < 50) continue; // 🐋 whale filter

      console.log("🐋 Whale TX", {
        hash: tx.hash,
        from: tx.fromAddress,
        to: tx.toAddress,
        value: valueEth
      });

      // NEXT STEPS (later):
      // - Save to MongoDB
      // - Send Telegram
      // - Emit to frontend
    }
  } catch (err) {
    console.error("Alchemy Event Error:", err.message);
  }
}
