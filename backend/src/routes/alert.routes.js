// backend/src/routes/alert.routes.js
import express from "express";
import { alertController } from "../controllers/index.js";

const router = express.Router();

/**
 * GET /api/alerts
 */
router.get("/", alertController.getAlerts);

/**
 * POST /api/alerts
 */
router.post("/", alertController.createAlert);

export default router;
