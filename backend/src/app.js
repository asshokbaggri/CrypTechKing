import express from "express";
import cors from "cors";

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());

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
