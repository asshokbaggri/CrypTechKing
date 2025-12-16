import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

router.post(
  "/alchemy", 
  express.raw({ type: "application/json" }), // ✅ FIX: express.raw को सीधे Webhook route में जोड़ें
  (req, res) => {
    try {
      const signature = req.headers["x-alchemy-signature"];

      if (!signature) {
        console.error("❌ Missing Alchemy signature");
        // ... (बाकी एरर हैंडलिंग)
        return res.status(401).send("Missing signature");
      }
      
      const rawBody = req.body; 
      
      // 🔥 CRASH PREVENTION CHECK
      if (!rawBody || rawBody.length === 0) {
          console.error("❌ Webhook body is empty or missing.");
          return res.status(400).send("Body required for signature verification.");
      }

      const expectedSignature = crypto
        .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("❌ Invalid Alchemy signature");
        return res.status(401).send("Invalid signature");
      }

      const payload = JSON.parse(rawBody.toString("utf8"));

      console.log("✅ ALCHEMY WEBHOOK RECEIVED and VERIFIED!");
      console.log(JSON.stringify(payload, null, 2));

      // अब आप इस event को handle कर सकते हैं
      // handleAlchemyEvent(payload); 

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("❌ Webhook processing CRASHED:", err.message);
      return res.status(500).send("Webhook processing failed");
    }
  }
);

export default router;
