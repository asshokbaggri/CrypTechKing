import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());
// ❌ यहाँ से app.use("/webhooks/alchemy", express.raw({ type: "application/json" })); हटाएँ

app.use(express.json()); // Global JSON parser (सिर्फ आपके बाकी API के लिए)

app.use("/webhooks", webhookRoutes);

export default app;
