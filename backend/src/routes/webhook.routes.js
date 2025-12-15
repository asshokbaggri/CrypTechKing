import express from "express";
import crypto from "crypto";
import { processWhaleTx } from "../services/whale.service.js";

const router = express.Router();

/**
 * Alchemy Webhook Endpoint
 */
router.post(
  "/alchemy",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.headers["x-alchemy-signature"];
    const payload = req.body;
    const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return res.status(401).send("Unauthorized");
    }

    // 🔐 Verify signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const digest = hmac.digest("hex");

    if (digest !== signature) {
      return res.status(401).send("Invalid signature");
    }

    // ✅ ACK immediately (Alchemy requirement)
    res.status(200).json({ received: true });

    // 🔥 Async non-blocking processing
    handleAlchemyEvent(payload);
  }
);

export default router;

/**
 * Business logic (async, safe)
 */
async function handleAlchemyEvent(payload) {
  try {
    const event = JSON.parse(payload.toString());
    if (!event?.event?.activity) return;

    for (const tx of event.event.activity) {
      const ethValue = Number(tx.value || 0) / 1e18;
      if (ethValue < 50) continue;

      await processWhaleTx({
        chain: "ETH",
        tx: {
          hash: tx.hash,
          from: tx.fromAddress,
          to: tx.toAddress,
          value: ethValue,
          blockNumber: tx.blockNum,
          timestamp: tx.metadata?.blockTimestamp
        }
      });
    }
  } catch (err) {
    console.error("Alchemy Event Error:", err.message);
  }
}
