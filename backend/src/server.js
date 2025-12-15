import app from "./app.js";
import { ENV, connectDB } from "./config/index.js";

import { startEthWhaleListener } from "./listeners/ethWhale.listener.js";

const startServer = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);

    // 🔥 START WHALE LISTENER HERE (CRITICAL)
    startEthWhaleListener();
  });
};

startServer();
