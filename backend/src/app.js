import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// ⚠️ IMPORTANT: Yeh line hata do completely
// app.use("/webhooks/alchemy", express.raw({ type: "application/json" }));

// Normal json parsing baaki sab ke liye
app.use(express.json());

// Webhook routes mount karo
app.use("/webhooks", webhookRoutes);

export default app;
