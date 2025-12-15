import express from "express";
import crypto from "crypto";

const router = express.Router();

/**
 * URL: /webhooks/alchemy
 */
router.post("/alchemy", (req, res) => {
  console.log("🔥🔥 ALCHEMY WEBHOOK HIT 🔥🔥");

  try {
    const signature = req.headers["x-alchemy-signature"];
    const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      console.log("❌ Missing signature or secret");
      return res.status(401).send("Unauthorized");
    }

    // Verify HMAC
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(req.body);
    const digest = hmac.digest("hex");

    if (digest !== signature) {
      console.log("❌ Invalid signature");
      return res.status(401).send("Invalid signature");
    }

    const event = JSON.parse(req.body.toString());

    // ✅ ACK FIRST
    res.status(200).json({ received: true });

    // Async process
    handleAlchemyEvent(event);

  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send("Server error");
  }
});

export default router;

/* ---------- Business Logic ---------- */
async function handleAlchemyEvent(event) {
  console.log("📦 EVENT RECEIVED:", JSON.stringify(event, null, 2));

  if (!event?.event?.activity) return;

  for (const tx of event.event.activity) {
    const valueEth = Number(tx.value || 0) / 1e18;
    if (valueEth < 50) continue;

    console.log("🐋 WHALE TX", {
      hash: tx.hash,
      from: tx.fromAddress,
      to: tx.toAddress,
      value: valueEth,
    });
  }
}
