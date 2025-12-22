import express from "express";
import crypto from "crypto";
import { ENV } from "./config/env.js";

const app = express();

/* ============================
   ALCHEMY WEBHOOK (FINAL)
   ============================ */
app.post(
  "/webhooks/alchemy",
  express.raw({
    type: "*/*",          // 🔥 IMPORTANT (NOT application/json)
    limit: "2mb",
    inflate: true,        // gzip support
  }),
  (req, res) => {
    try {
      console.log("🔥 WEBHOOK HIT"); // <-- MUST APPEAR

      const signature = req.headers["x-alchemy-signature"];
      if (!signature) {
        console.error("❌ Missing signature");
        return res.sendStatus(401);
      }

      const expectedSignature = crypto
        .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
        .update(req.body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("❌ Signature mismatch");
        return res.sendStatus(401);
      }

      const payload = JSON.parse(req.body.toString());

      console.log("✅ ALCHEMY VERIFIED");
      console.log(payload?.event?.activity?.[0] || payload);

      return res.sendStatus(200);
    } catch (err) {
      console.error("🔥 WEBHOOK ERROR:", err);
      return res.sendStatus(500);
    }
  }
);

/* ============================
   NORMAL APIs
   ============================ */
app.use(express.json());

export default app;
