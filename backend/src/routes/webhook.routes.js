import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  console.log("🔥 WEBHOOK HIT FROM ALCHEMY");

  const signature = req.headers["x-alchemy-signature"];
  const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

  if (!signature || !secret) {
    console.log("❌ Missing signature or secret");
    return res.status(401).send("Unauthorized");
  }

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(req.body);
  const digest = hmac.digest("hex");

  if (digest !== signature) {
    console.log("❌ Invalid signature");
    return res.status(401).send("Invalid signature");
  }

  const event = JSON.parse(req.body.toString());

  console.log("✅ VERIFIED EVENT");
  console.log(JSON.stringify(event, null, 2));

  res.status(200).json({ received: true });
});

export default router;
