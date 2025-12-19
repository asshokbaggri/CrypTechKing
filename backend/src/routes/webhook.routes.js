import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post(
  "/alchemy",
  express.raw({ type: "application/json" }), // ✅ Sirf iske liye Raw Body
  (req, res) => {
    try {
      // Seedha process.env use kar rahe hain for safety
      const secret = process.env.ALCHEMY_WEBHOOK_SECRET;
      const signature = req.headers["x-alchemy-signature"];

      if (!secret || !signature) {
        console.error("❌ Missing Secret or Signature Header");
        return res.status(401).send("Unauthorized");
      }

      // 🛑 502 Fix: Check if body is a Buffer
      if (!Buffer.isBuffer(req.body)) {
        console.error("❌ req.body is not a Buffer. Check app.js middleware.");
        return res.status(500).send("Middleware Config Error");
      }

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(req.body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("❌ Signature Mismatch");
        return res.status(401).send("Invalid Signature");
      }

      const payload = JSON.parse(req.body.toString());
      console.log("✅ Alchemy Webhook Verified:", payload.id);

      // Success Response
      res.status(200).json({ success: true });

    } catch (err) {
      console.error("🔥 Webhook Crash:", err.message);
      if (!res.headersSent) {
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

export default router;
