import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// IMPORTANT: raw body only for webhooks
app.use("/webhooks", express.raw({ type: "application/json" }));

// normal APIs (future)
app.use(express.json());

app.use("/webhooks", webhookRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
