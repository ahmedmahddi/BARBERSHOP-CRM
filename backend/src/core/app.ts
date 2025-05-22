import express from "express";
import cors from "cors";
import helmet from "helmet";
import {
  loggerMiddleware,
  requestLogger,
} from "../common/middleware/logger.middleware";
import { errorMiddleware, notFoundMiddleware } from "./error.middleware";

// Import API routes
import barberRoutes from "../api/barbers/barbers.routes";
import serviceRoutes from "../api/services/services.routes";
import bookingRoutes from "../api/bookings/bookings.routes";
import imageRoutes from "../api/images/images.routes";
import productRoutes from "../api/products/products.routes";
import orderRoutes from "../api/orders/orders.routes";

// Create Express app
const app = express();

// Apply middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(requestLogger);

// API routes
app.use("/api/barbers", barberRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Handle 404 errors
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

export default app;
