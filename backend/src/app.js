import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// 🔥 FIX: Webhook routes ko JSON parser se bachao
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhooks")) {
    next(); // Webhook hai toh seedha aage bhejo
  } else {
    express.json()(req, res, next); // Baki sab ke liye JSON parse karo
  }
});

app.use("/webhooks", webhookRoutes);

export default app;
