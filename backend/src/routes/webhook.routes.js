// backend/src/routes/webhook.routes.js
import express from "express";
import crypto from "crypto";

const router = express.Router();

// -------------------------------------------------------------------
// 🔥 READY-TO-PASTE CODE START 🔥
// -------------------------------------------------------------------

/**
 * Alchemy Webhook Endpoint
 * URL: /webhooks/alchemy
 */
router.post(
  "/alchemy",
  // Alchemy application/json भेजता है, express.raw इसे Buffer के रूप में कैप्चर करता है।
  express.raw({ type: "application/json" }), 
  (req, res) => {
    try {
      console.log("🔥 WEBHOOK HIT from Alchemy");

      const signature = req.headers["x-alchemy-signature"];
      const secret = process.env.ALCHEMY_WEBHOOK_SECRET;

      if (!req.body) {
          console.error("❌ Request body is empty or missing.");
          // 400 भेजें क्योंकि यह एक Bad Request है
          return res.status(400).send("Bad Request: Body missing.");
      }

      if (!signature || !secret) {
        console.error("❌ Missing signature or secret variable (Railway or Header)");
        return res.status(401).send("Unauthorized");
      }

      // 1. Verify HMAC
      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(req.body); // req.body यहाँ एक Buffer है
      const digest = hmac.digest("hex");

      if (digest !== signature) {
        console.error("❌ Invalid signature! Signature Mismatch.");
        return res.status(401).send("Invalid signature");
      }

      // 2. Parse JSON payload
      // सिग्नेचर मैच होने के बाद ही पार्स करें
      const event = JSON.parse(req.body.toString());

      console.log("✅ Alchemy Event VERIFIED", {
        id: event?.id,
        type: event?.type,
        activityCount: event?.event?.activity?.length || 0,
      });

      // 3. ACK immediately (तुरंत 200 भेजें)
      res.status(200).json({ received: true });

      // 4. Async processing (लंबा काम यहाँ करें)
      handleAlchemyEvent(event);

    } catch (err) {
      // 502/क्रैश से बचने के लिए यह Catch बहुत महत्वपूर्ण है
      console.error("❌ Webhook processing CRASHED or Parsing Error:", err.message);
      // Alchemy को 200 भेज चुके होने पर भी, यह सुनिश्चित करता है कि सर्वर क्रैश न हो।
      // यदि ACK से पहले क्रैश हुआ, तो 500 भेजें।
      if (!res.headersSent) {
          res.status(500).send("Server error during initial processing");
      }
    }
  }
);

export default router;

/* ---------- Business Logic (आपकी प्रोसेसिंग यहाँ होती है) ---------- */
async function handleAlchemyEvent(event) {
  try {
    if (!event?.event?.activity || event.event.activity.length === 0) {
        console.log("ℹ️ No activity found in event payload.");
        return;
    }

    for (const tx of event.event.activity) {
      console.log(`🐋 Processing TX HASH: ${tx.hash}`);
      // यहाँ MongoDB अपडेट, नोटिफिकेशन, या अन्य लॉजिक जाएगा
    }
  } catch (err) {
    console.error("❌ Event Processing Error in Async Handler:", err);
  }
}

// -------------------------------------------------------------------
// 🔥 READY-TO-PASTE CODE END 🔥
// -------------------------------------------------------------------
