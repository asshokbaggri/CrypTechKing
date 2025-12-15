import express from "express";
import crypto from "crypto";
import { processWhaleTx } from "../services/whale.service.js";

const router = express.Router();

/**
 * Alchemy Webhook
 * URL → /webhook/alchemy
 */
router.post(
  "/alchemy",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-alchemy-signature"];
      const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

      if (!signature || !secret) {
        return res.status(401).send("Unauthorized");
      }

      // 🔐 Verify signature
      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(req.body);
      const digest = hmac.digest("hex");

      if (digest !== signature) {
        return res.status(401).send("Invalid signature");
      }

      const payload = JSON.parse(req.body.toString());

      // ✅ ACK FAST (Alchemy requirement)
      res.status(200).json({ received: true });

      // 🔥 Async processing
      if (!payload?.event?.activity) return;

      for (const tx of payload.event.activity) {
        const ethValue = Number(tx.value || 0) / 1e18;
        if (ethValue < 50) continue;

        await processWhaleTx({
          chain: "ETH",
          tx,
          usdValue: ethValue,
        });
      }
    } catch (err) {
      console.error("Webhook Error:", err.message);
      res.status(500).send("Server error");
    }
  }
);

export default router;
