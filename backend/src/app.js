import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());
app.use(express.json());  // normal json baaki sab ke liye

app.use("/webhooks", webhookRoutes);

export default app;
