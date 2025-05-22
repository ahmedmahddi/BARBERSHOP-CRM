import { Router } from "express";
import multer from "multer";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from "./bookings.controller";
import { validateDto } from "../../common/middleware/validate.middleware";
import { validateBooking } from "../../common/middleware/booking-validation.middleware";
import { validateFile } from "../../common/middleware/file-validation.middleware";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import {
  CreateBookingDtoSchema,
  UpdateBookingDtoSchema,
  UpdateBookingStatusDtoSchema,
} from "./bookings.dto";

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Public routes
router.get("/:id", getBookingById);
// Accept a single file with any field name (req.files[0])
router.post(
  "/",
  upload.any(),
  validateDto(CreateBookingDtoSchema),
  validateBooking,
  validateFile,
  createBooking
);

// Protected routes (require authentication)
router.get("/", authMiddleware, getBookings);
router.put(
  "/:id",
  authMiddleware,
  validateDto(UpdateBookingDtoSchema),
  updateBooking
);
router.patch(
  "/:id/status",
  authMiddleware,
  validateDto(UpdateBookingStatusDtoSchema),
  updateBookingStatus
);
router.delete("/:id", authMiddleware, deleteBooking);

// Test route for smoke testing
router.get("/test", (req, res) => {
  res.json({ message: "Bookings API is working" });
});

export default router;
