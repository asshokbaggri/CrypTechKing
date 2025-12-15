// backend/src/controllers/whale.controller.js
import * as whaleService from "../services/whale.service.js";

export const getLatestWhales = async (req, res) => {
  try {
    const data = await whaleService.fetchLatestWhales();
    res.json({ success: true, data });
  } catch (err) {
    console.error("Whale controller error:", err);
    res.status(500).json({ success: false, message: "Whale fetch failed" });
  }
};
