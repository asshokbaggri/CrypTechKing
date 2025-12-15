import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// 🔥 VERY IMPORTANT — webhook BEFORE json
app.use("/webhooks", express.raw({ type: "application/json" }));
app.use(express.json());

// Routes
app.use("/webhooks", webhookRoutes);

// Health
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

export default app;
