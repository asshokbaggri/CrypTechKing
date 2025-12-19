import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// 🔥 Step 1: Webhook ke liye JSON parser ko bypass karo
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhooks")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use("/webhooks", webhookRoutes);

export default app;
