import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/alchemy", (req, res) => {
  try {
    const signature = req.headers["x-alchemy-signature"];
    const webhookId = req.headers["x-alchemy-webhook-id"];

    if (!signature || !webhookId) {
      console.error("❌ Missing Alchemy headers");
      return res.sendStatus(401);
    }

    const rawBody = req.body; // Buffer

    const signedPayload = Buffer.concat([
      rawBody,
      Buffer.from(webhookId)
    ]);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.ALCHEMY_WEBHOOK_SECRET)
      .update(signedPayload)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid Alchemy signature");
      return res.sendStatus(401);
    }

    const payload = JSON.parse(rawBody.toString());

    console.log("✅ Alchemy Webhook Verified");
    console.log(payload?.event?.activity?.[0] || payload);

    // 🔥 MUST ACK FAST
    return res.sendStatus(200);

  } catch (err) {
    console.error("🔥 Webhook error:", err);
    return res.sendStatus(500);
  }
});

export default router;
