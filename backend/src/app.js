import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/* 🔥 ALCHEMY WEBHOOK — RAW BODY (ALL CONTENT TYPES) */
app.use(
  "/webhooks/alchemy",
  express.raw({
    type: "*/*" // 🔥 THIS IS THE FIX
  })
);

// normal APIs
app.use(cors());
app.use(express.json());

app.use("/webhooks", webhookRoutes);

export default app;
