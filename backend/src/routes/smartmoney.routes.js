// backend/src/routes/smartmoney.routes.js
import express from "express";
import { smartMoneyController } from "../controllers/index.js";

const router = express.Router();

/**
 * GET /api/smartmoney/summary
 */
router.get("/summary", smartMoneyController.getSmartMoneyStats);

export default router;
