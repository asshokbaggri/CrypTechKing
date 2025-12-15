// backend/src/routes/whale.routes.js
import express from "express";
import { whaleController } from "../controllers/index.js";

const router = express.Router();

/**
 * GET /api/whales/latest
 */
router.get("/latest", whaleController.getLatestWhales);

export default router;
