import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

async function startServer() {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
}

startServer();
