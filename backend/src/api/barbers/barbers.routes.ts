import { Router } from "express";
import {
  getBarbers,
  getBarberById,
  createBarber,
  updateBarber,
  deleteBarber,
  getBarberAvailability,
} from "./barbers.controller";
import { validateDto } from "../../common/middleware/validate.middleware";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import {
  CreateBarberDtoSchema,
  UpdateBarberDtoSchema,
  GetBarberAvailabilityDtoSchema,
} from "./barbers.dto";

const router = Router();

// Public routes
router.get("/", getBarbers);
router.get("/:id", getBarberById);
router.get(
  "/:id/availability",
  validateDto(GetBarberAvailabilityDtoSchema),
  getBarberAvailability
);

// Protected routes (require authentication)
router.post(
  "/",
  authMiddleware,
  validateDto(CreateBarberDtoSchema),
  createBarber
);
router.put(
  "/:id",
  authMiddleware,
  validateDto(UpdateBarberDtoSchema),
  updateBarber
);
router.delete("/:id", authMiddleware, deleteBarber);

// Test route for smoke testing
router.get("/test", (req, res) => {
  res.json({ message: "Barbers API is working" });
});

export default router;
