import express from "express";
import cors from "cors";
import crypto from "crypto";
import { ENV } from "./config/env.js";

const app = express();

/* 🔥 ALCHEMY WEBHOOK — RAW BODY + HANDLER TOGETHER */
app.post(
  "/webhooks/alchemy",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      const signature = req.headers["x-alchemy-signature"];
      if (!signature) return res.sendStatus(401);

      const expectedSignature = crypto
        .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
        .update(req.body)
        .digest("hex");

      if (signature !== expectedSignature) {
        return res.sendStatus(401);
      }

      const payload = JSON.parse(req.body.toString());

      console.log("✅ Alchemy Webhook OK");
      console.log(payload?.event?.activity?.[0] || payload);

      return res.sendStatus(200);
    } catch (err) {
      console.error("🔥 Webhook crash:", err);
      return res.sendStatus(500);
    }
  }
);

/* Normal APIs AFTER webhook */
app.use(cors());
app.use(express.json());

export default app;
