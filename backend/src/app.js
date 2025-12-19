import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(cors());

// Global JSON parser with raw body save (Alchemy official way)
app.use(
  express.json({
    verify: (req, res, buf) => {
      // Save raw body as string for signature verification
      req.alchemyRawBody = buf.toString("utf8");
    },
    type: "application/json",
  })
);

// Mount webhook routes
app.use("/webhooks", webhookRoutes);

export default app;
