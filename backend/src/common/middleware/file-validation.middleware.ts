import { Request, Response, NextFunction } from "express";
import { ENV } from "../configs/env.config";

/** Validates uploaded file type and size */
export function validateFile(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Support both multer.any() (req.files[0]) and multer.single() (req.file)
  const file = (Array.isArray(req.files) && req.files.length > 0) ? req.files[0] : req.file;

  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  // Check file type
  if (!ENV.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    res.status(400).json({
      error: `Invalid file type. Allowed: ${ENV.ALLOWED_FILE_TYPES.join(", ")}`,
    });
    return;
  }

  // Check file size
  if (file.size > ENV.MAX_FILE_SIZE) {
    const maxSizeMB = ENV.MAX_FILE_SIZE / (1024 * 1024);
    res.status(400).json({
      error: `File size exceeds ${maxSizeMB}MB limit`,
    });
    return;
  }

  next();
}
