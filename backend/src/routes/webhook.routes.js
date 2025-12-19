import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";  // assuming tum ENV use kar rahe ho, warna process.env bhi chalega

const router = express.Router();

router.post("/alchemy", (req, res) => {
  console.log("WEBHOOK RECEIVED - HIT HO GAYA!");  // Yeh Deploy Logs mein dikhega

  try {
    const signature = req.headers["x-alchemy-signature"];

    if (!signature) {
      console.error("Missing signature");
      return res.status(401).send("No signature");
    }

    const rawBody = req.alchemyRawBody;

    if (!rawBody) {
      console.error("Raw body missing");
      return res.status(500).send("No raw body");
    }

    const expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET.trim())
      .update(rawBody, "utf8")
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Invalid signature");
      console.log("Received:", signature);
      console.log("Expected:", expectedSignature);
      return res.status(401).send("Invalid signature");
    }

    // req.body already parsed hai express.json() se
    const payload = req.body;

    console.log("ALCHEMY WEBHOOK VERIFIED SUCCESSFULLY!");
    console.log("Payload sample:", payload.event?.activity?.[0] || payload);

    return res.status(200).send("OK");

  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(500).send("Error");
  }
});

export default router;
