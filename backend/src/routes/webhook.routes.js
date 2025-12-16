import express from "express";
import crypto from "crypto";
import { ENV } from "../config/env.js";

const router = express.Router();

// Raw body middleware sirf alchemy route ke liye
router.use("/alchemy", express.raw({ type: "application/json" }));

router.post("/alchemy", (req, res) => {
  const signature = req.headers["x-alchemy-signature"];

  if (!signature) {
    console.error("❌ Missing Alchemy signature");
    return res.status(401).send("Missing signature");
  }

  const rawBody = req.body;

  if (!Buffer.isBuffer(rawBody)) {
    console.error("❌ Body is not a raw buffer!");
    return res.status(500).send("Invalid body format");
  }

  let expectedSignature;
  try {
    expectedSignature = crypto
      .createHmac("sha256", ENV.ALCHEMY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");
  } catch (err) {
    console.error("❌ Error generating signature:", err);
    return res.status(500).send("Signature generation failed");
  }

  if (signature !== expectedSignature) {
    console.error("❌ Invalid Alchemy signature - possible fake request!");
    console.log("Received signature:", signature);
    console.log("Expected signature:", expectedSignature);
    return res.status(401).send("Invalid signature");  // Yaha return kar ke bahar nikal jao
  }

  // Ab signature valid hai → safely parse
  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch (err) {
    console.error("❌ Failed to parse JSON payload:", err);
    return res.status(400).send("Invalid JSON");
  }

  console.log("✅ ALCHEMY WEBHOOK RECEIVED & VERIFIED SUCCESSFULLY!");
  console.log(JSON.stringify(payload, null, 2));

  // Yaha par apna actual logic daal dena (DB save etc.)

  return res.status(200).json({ ok: true });
});

export default router;
