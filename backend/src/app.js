import express from "express";
import crypto from "crypto";
import { ENV } from "./config/env.js";

const app = express();

/* ============================
   ALCHEMY WEBHOOK (CRITICAL)
   ============================ */
app.post(
  "/webhooks/alchemy",
  express.raw({
    type: "application/json",
    verify: (req, res, buf) => {
      req.rawBody = buf; // 💥 THIS IS THE KEY
    },
  }),
  (req, res) => {
    try {
      const signature = req.headers["x-alchemy-signature"];
      if (!signature) return res.sendStatus(401);

      const expectedSignature = crypto
        .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
        .update(req.rawBody)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("❌ Signature mismatch");
        return res.sendStatus(401);
      }

      const payload = JSON.parse(req.rawBody.toString());

      console.log("✅ ALCHEMY WEBHOOK VERIFIED");
      console.log(payload?.event?.activity?.[0] || payload);

      return res.sendStatus(200);
    } catch (err) {
      console.error("🔥 Webhook crash:", err);
      return res.sendStatus(500);
    }
  }
);

/* ============================
   NORMAL APIs (AFTER)
   ============================ */
app.use(express.json());

export default app;
