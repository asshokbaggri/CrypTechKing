import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/* =================================================
   ALCHEMY WEBHOOK — RAW BODY (VERY IMPORTANT)
   MUST be BEFORE express.json()
================================================= */
app.use(
  "/webhooks/alchemy",
  express.raw({ type: "application/json" })
);

/* ---------- Normal Middlewares ---------- */
app.use(cors());
app.use(express.json());

/* ---------- Routes ---------- */
app.use("/webhooks", webhookRoutes);

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CrypTechKing Backend",
    time: new Date().toISOString()
  });
});

/* ---------- Root ---------- */
app.get("/", (req, res) => {
  res.send("🚀 CrypTechKing API running");
});

export default app;
