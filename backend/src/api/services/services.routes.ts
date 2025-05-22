import { Router } from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "./services.controller";
import { validateDto } from "../../common/middleware/validate.middleware";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { CreateServiceDtoSchema, UpdateServiceDtoSchema } from "./services.dto";

const router = Router();

// Public routes
router.get("/", getServices);
router.get("/:id", getServiceById);

// Protected routes (require authentication)
router.post(
  "/",
  authMiddleware,
  validateDto(CreateServiceDtoSchema),
  createService
);
router.put(
  "/:id",
  authMiddleware,
  validateDto(UpdateServiceDtoSchema),
  updateService
);
router.delete("/:id", authMiddleware, deleteService);

// Test route for smoke testing
router.get("/test", (req, res) => {
  res.json({ message: "Services API is working" });
});

export default router;
