import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

// Sirf alchemy webhook ke liye raw body
router.post("/alchemy", express.raw({ type: "application/json" }), (req, res) => {
  console.log("WEBHOOK HIT HO GAYA!");  // Yeh Deploy Logs mein dikhega

  try {
    const signature = req.headers["x-alchemy-signature"];

    if (!signature) {
      console.log("No signature header");
      return res.status(401).send("No signature");
    }

    const rawBody = req.body;

    if (!Buffer.isBuffer(rawBody)) {
      console.log("Body is not Buffer:", typeof rawBody);
      return res.status(500).send("Body not raw");
    }

    console.log("Raw body length:", rawBody.length);

    const expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET.trim())
      .update(rawBody)
      .digest("hex");

    console.log("Signature check - received:", signature);
    console.log("Signature check - expected:", expectedSignature);

    if (signature !== expectedSignature) {
      console.log("Invalid signature");
      return res.status(401).send("Invalid signature");
    }

    const payload = JSON.parse(rawBody.toString("utf-8"));

    console.log("ALCHEMY WEBHOOK SUCCESSFULLY RECEIVED!");
    console.log("Payload:", JSON.stringify(payload, null, 2));

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("UNHANDLED ERROR IN WEBHOOK:", error.message);
    console.error(error.stack);
    return res.status(500).send("Internal error");
  }
});

export default router;
