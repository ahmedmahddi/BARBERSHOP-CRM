import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { ENV } from "../configs/env.config";

/** Configure Morgan logger based on environment */
export const loggerMiddleware = morgan(
  ENV.NODE_ENV === "production" ? "combined" : "dev",
  {
    skip: (req: Request) => {
      // Skip logging for health check endpoints in production
      return ENV.NODE_ENV === "production" && req.path === "/health";
    },
  }
);

/** Custom request logger for debugging */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (ENV.NODE_ENV !== "production" && ENV.LOG_LEVEL === "debug") {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

    if (Object.keys(req.body).length > 0) {
      console.log("Body:", JSON.stringify(req.body, null, 2));
    }

    if (Object.keys(req.query).length > 0) {
      console.log("Query:", JSON.stringify(req.query, null, 2));
    }
  }

  next();
}
