import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// 🔥 FIX: Global middleware jo sirf non-webhook routes ke liye JSON parse karega
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/webhooks")) {
    // Webhook route hai? Toh skip karo, isse webhook.routes handle karega
    next();
  } else {
    // Normal API hai? Toh JSON parse karo
    express.json()(req, res, next);
  }
});

// Routes mount karna
app.use("/webhooks", webhookRoutes);

export default app;
