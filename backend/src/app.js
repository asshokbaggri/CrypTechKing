import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/**
 * ❗ VERY IMPORTANT
 * Raw body ONLY for Alchemy
 */
app.post(
  "/webhooks/alchemy",
  express.raw({ type: "*/*" })
);

// ❗ JSON middleware AFTER webhook
app.use(cors());
app.use(express.json());

app.use("/webhooks", webhookRoutes);

export default app;
