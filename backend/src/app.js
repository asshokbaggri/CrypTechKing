import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

// ❗❗ IMPORTANT ORDER
app.use(cors());

// Normal JSON for ALL routes
app.use(express.json());

// Routes (RAW middleware will be inside router)
app.use("/webhooks", webhookRoutes);

export default app;
