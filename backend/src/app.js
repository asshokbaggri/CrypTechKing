import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// ← Yeh line pehle rakhna zaroori hai (raw body ke liye)
app.use("/webhooks/alchemy", express.raw({ type: "application/json" }));

// Baaki routes ke liye normal json parsing
app.use(express.json());

// Ab webhook router mount karo
app.use("/webhooks", webhookRoutes);

export default app;
