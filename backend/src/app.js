import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

/**
 * ⚠️ VERY IMPORTANT
 * - Webhook routes MUST get RAW body
 * - Normal APIs get JSON
 */
app.use("/webhooks", express.raw({ type: "application/json" }));
app.use(express.json());

/* ---------- Webhooks ---------- */
app.use("/webhooks", webhookRoutes);

/* ---------- Health ---------- */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CrypTechKing Backend",
    time: new Date().toISOString(),
  });
});

/* ---------- Root ---------- */
app.get("/", (req, res) => {
  res.send("🚀 CrypTechKing API running");
});

export default app;
