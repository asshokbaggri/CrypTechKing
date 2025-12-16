import express from "express";
import cors from "cors";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

/**
 * IMPORTANT: Webhook body parser
 */
app.use(express.json({ limit: "5mb" }));

app.use(cors());

app.use("/webhooks", webhookRoutes);

app.get("/", (req, res) => {
  res.send("CrypTechKing Backend Live 🚀");
});

export default app;
