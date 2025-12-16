import express from "express";

const router = express.Router();

/**
 * Alchemy Webhook Receiver
 */
router.post("/alchemy", async (req, res) => {
  try {
    console.log("🔥 ALCHEMY WEBHOOK HIT");
    console.log(JSON.stringify(req.body, null, 2));

    // IMPORTANT: Always respond FAST
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(200).json({ success: false }); 
    // 👆 STILL 200 so Alchemy stops retrying
  }
});

export default router;
