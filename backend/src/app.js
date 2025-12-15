import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());

/**
 * 🔥 VERY IMPORTANT
 * - Webhook needs RAW body
 * - JSON middleware MUST be AFTER webhook
 */
app.use("/webhooks", webhookRoutes);

// Normal APIs
app.use(express.json());

/* ---------- Health ---------- */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
