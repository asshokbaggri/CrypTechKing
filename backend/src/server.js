import app from "./app.js";
import { ENV, connectDB } from "./config/index.js";

// 🐳 Whale listeners
import { startEthWhaleListener } from "./listeners/ethWhale.listener.js";
// later:
// import { startPolygonWhaleListener } from "./listeners/polygonWhale.listener.js";
// import { startBnbWhaleListener } from "./listeners/bnbWhale.listener.js";

const startServer = async () => {
  await connectDB();

  // 🔥 START LISTENERS AFTER DB IS READY
  startEthWhaleListener();

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
};

startServer();
