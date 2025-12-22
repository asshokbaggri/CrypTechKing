import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/* 🔥 CAPTURE RAW BODY FOR ALCHEMY */
app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl === "/webhooks/alchemy") {
        req.rawBody = buf; // 👈 THIS IS THE KEY
      }
    }
  })
);

app.use(cors());

app.use("/webhooks", webhookRoutes);

export default app;
