import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

// Special middleware sirf is webhook route ke liye raw body save karne ke liye
router.use("/alchemy", express.raw({ type: "application/json" }));

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];

    if (!signature) {
      console.error("❌ Missing Alchemy signature");
      return res.status(401).send("Missing signature");
    }

    // Ab yaha req.body raw Buffer hi milega kyunki upar raw middleware laga hai
    const rawBody = req.body;

    if (!Buffer.isBuffer(rawBody)) {
      console.error("❌ Body is not raw buffer");
      return res.status(500).send("Invalid body");
    }

    const expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid Alchemy signature");
      return res.status(401).send("Invalid signature");
    }

    // Ab safely parse kar sakte hain
    const payload = JSON.parse(rawBody.toString("utf8"));

    console.log("✅ ALCHEMY WEBHOOK RECEIVED SUCCESSFULLY");
    console.log(JSON.stringify(payload, null, 2));

    // Yaha par apna actual logic daal dena baad mein (DB save etc.)

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return res.status(500).send("Webhook processing failed");
  }
});

export default router;
