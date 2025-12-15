// backend/src/routes/index.js
import whaleRoutes from "./whale.routes.js";
import smartMoneyRoutes from "./smartmoney.routes.js";
import pumpRoutes from "./pump.routes.js";
import alertRoutes from "./alert.routes.js";

export const registerRoutes = (app) => {
  app.use("/api/whales", whaleRoutes);
  app.use("/api/smartmoney", smartMoneyRoutes);
  app.use("/api/pump", pumpRoutes);
  app.use("/api/alerts", alertRoutes);
};
