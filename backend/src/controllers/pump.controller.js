// backend/src/controllers/pump.controller.js
import * as pumpService from "../services/pump.service.js";

export const scanPumps = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const tokens = await pumpService.scan(limit);
    res.json({ success: true, tokens });
  } catch (err) {
    console.error("Pump error:", err);
    res.status(500).json({ success: false, message: "Pump scan failed" });
  }
};
