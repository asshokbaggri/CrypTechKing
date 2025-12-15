// backend/src/controllers/smartmoney.controller.js
import * as smartMoneyService from "../services/smartmoney.service.js";

export const getSmartMoneyStats = async (req, res) => {
  try {
    const stats = await smartMoneyService.getStats();
    res.json({ success: true, stats });
  } catch (err) {
    console.error("SmartMoney error:", err);
    res.status(500).json({ success: false, message: "Smart money failed" });
  }
};
