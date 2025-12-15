import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];
    const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return res.status(401).send("Unauthorized");
    }

    // 🔐 CORRECT verification (BASE64)
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(req.body);
    const digest = hmac.digest("base64");

    if (digest !== signature) {
      return res.status(401).send("Invalid signature");
    }

    const event = JSON.parse(req.body.toString());

    // ✅ ACK IMMEDIATELY
    res.status(200).json({ received: true });

    // 🔥 async processing
    processAlchemyEvent(event);
  } catch (err) {
    console.error("❌ Webhook Error:", err);
    res.status(500).send("Server error");
  }
});

export default router;

function processAlchemyEvent(event) {
  console.log("✅ ALCHEMY EVENT RECEIVED");
  console.dir(event, { depth: 4 });
}
