// backend/src/controllers/alert.controller.js
import * as alertService from "../services/alert.service.js";

export const createAlert = async (req, res) => {
  try {
    const alert = await alertService.create(req.body);
    res.json({ success: true, alert });
  } catch (err) {
    console.error("Alert error:", err);
    res.status(500).json({ success: false, message: "Alert creation failed" });
  }
};

export const getAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getAll();
    res.json({ success: true, alerts });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
