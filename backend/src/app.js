// backend/src/app.js

import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

// ❗ ALCHEMY WEBHOOK — RAW BODY (MUST BE FIRST)
app.use(
  "/webhooks/alchemy",
  express.raw({ type: "application/json" })
);

// Normal middleware (after webhook)
app.use(cors());
app.use(express.json());

// Routes
app.use("/webhooks", webhookRoutes);

export default app;
