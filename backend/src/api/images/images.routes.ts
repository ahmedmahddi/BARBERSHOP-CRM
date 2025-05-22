import { Router } from "express";
import multer from "multer";
import {
  uploadImage,
  deleteImage,
  getImageMetadata,
} from "./images.controller";
import { validateDto } from "../../common/middleware/validate.middleware";
import { validateFile } from "../../common/middleware/file-validation.middleware";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { UploadImageDtoSchema } from "./images.dto";

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Public routes
router.post(
  "/upload",
  upload.single("image"),
  validateFile,
  validateDto(UploadImageDtoSchema),
  uploadImage
);

// Protected routes (require authentication)
router.delete("/:path", authMiddleware, deleteImage);
router.get("/:path/metadata", authMiddleware, getImageMetadata);

// Test route for smoke testing
router.get("/test", (req, res) => {
  res.json({ message: "Images API is working" });
});

export default router;
