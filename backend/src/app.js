import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());

// Conditional body parser
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhooks")) {
    next(); // raw body for webhooks
  } else {
    express.json()(req, res, next);
  }
});

/* ---------- Webhooks ---------- */
app.use("/webhooks", webhookRoutes);

/* ---------- Health ---------- */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ---------- Root ---------- */
app.get("/", (req, res) => {
  res.send("🚀 CrypTechKing API running");
});

export default app;
