import app from "./core/app";
import { ENV } from "./common/configs/env.config";

// Start the server
app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
  console.log(`Health check: http://localhost:${ENV.PORT}/health`);
  console.log(`API base URL: http://localhost:${ENV.PORT}/api`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", error => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
