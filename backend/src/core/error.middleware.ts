import { Request, Response, NextFunction } from "express";
import { ENV } from "../common/configs/env.config";

/** Interface for API error */
export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

/** Global error handler middleware */
export function errorMiddleware(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error
  console.error(`[ERROR] ${statusCode} - ${message}`);
  if (err.stack && ENV.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  // Send error response
  res.status(statusCode).json({
    error: message,
    details: ENV.NODE_ENV === "production" ? undefined : err.details,
    stack: ENV.NODE_ENV === "production" ? undefined : err.stack,
  });
}

/** Not found middleware */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    error: `Not Found: ${req.method} ${req.path}`,
  });
}

/** Custom error factory */
export function createError(
  message: string,
  statusCode: number,
  details?: any
): ApiError {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}
