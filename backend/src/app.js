import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

// MUST BE FIRST
app.use("/webhooks/alchemy", express.raw({ type: "application/json" }));

app.use(cors());
app.use(express.json());

app.use("/webhooks", webhookRoutes);

export default app;
