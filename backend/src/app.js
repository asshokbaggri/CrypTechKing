import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());

/**
 * IMPORTANT:
 * - Webhooks need RAW body
 * - Normal APIs need JSON
 */
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhooks")) {
    next(); // raw body allowed
  } else {
    express.json()(req, res, next);
  }
});

/* ---------- Webhooks ---------- */
app.use("/webhooks", webhookRoutes);

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CrypTechKing Backend",
    time: new Date().toISOString()
  });
});

/* ---------- Root ---------- */
app.get("/", (req, res) => {
  res.send("🚀 CrypTechKing API running");
});

export default app;
