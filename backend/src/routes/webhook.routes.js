import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

// 🔥 Step 2: express.raw yahan add karo taaki req.body Buffer bane
router.post("/alchemy", express.raw({ type: "application/json" }), (req, res) => {
  try {
    const secret = ENV.ALCHEMY_WEBHOOK_SECRET || process.env.ALCHEMY_WEBHOOK_SECRET;
    const signature = req.headers["x-alchemy-signature"];

    // 🛑 Crash Guard 1: Secret check
    if (!secret) {
      console.error("❌ ALCHEMY_WEBHOOK_SECRET is missing in Env Variables");
      return res.status(500).send("Config error");
    }

    // 🛑 Crash Guard 2: Signature check
    if (!signature) {
      console.error("❌ No signature in headers");
      return res.status(401).send("No signature");
    }

    // 🛑 Crash Guard 3: Body check (Yahan 502 fix hota hai)
    if (!req.body || Buffer.isBuffer(req.body) === false) {
      console.error("❌ Body is not a Buffer. Middleware issue.");
      return res.status(400).send("Invalid body format");
    }

    // ✅ Signature Verification
    const expected = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (signature !== expected) {
      console.error("❌ Signature Mismatch");
      return res.status(401).send("Invalid signature");
    }

    // ✅ Processing
    const payload = JSON.parse(req.body.toString());
    console.log("✅ Alchemy Webhook Verified:", payload.id || "Event Received");

    // Success response
    return res.status(200).send("Webhook Received");

  } catch (err) {
    console.error("🔥 Webhook processing error:", err.message);
    // Catch block ensures 502 doesn't happen, instead sends 500
    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    }
  }
});

export default router;
