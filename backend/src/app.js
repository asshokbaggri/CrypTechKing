import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());

/**
 * IMPORTANT
 * - Alchemy webhook = RAW BODY
 * - Normal APIs = JSON
 */
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhook")) {
    next(); // raw body handled in route
  } else {
    express.json()(req, res, next);
  }
});

/* ---------- Webhook Routes ---------- */
app.use("/webhook", webhookRoutes);

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
