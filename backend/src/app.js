// backend/src/app.js
import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// ⚠️ VERY IMPORTANT
// Webhook needs RAW body, rest needs JSON
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhooks")) {
    next(); // DO NOT touch body
  } else {
    express.json()(req, res, next);
  }
});

app.use("/webhooks", webhookRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
