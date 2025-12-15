// backend/src/routes/pump.routes.js
import express from "express";
import { pumpController } from "../controllers/index.js";

const router = express.Router();

/**
 * GET /api/pump?limit=50
 */
router.get("/", pumpController.scanPumps);

export default router;
