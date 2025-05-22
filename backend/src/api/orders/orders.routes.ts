import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} from "./orders.controller";
import { validateDto } from "../../common/middleware/validate.middleware";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import {
  CreateOrderDtoSchema,
  UpdateOrderDtoSchema,
  UpdateOrderStatusDtoSchema,
} from "./orders.dto";

const router = Router();

// Public routes
router.get("/:id", getOrderById);
router.post("/", validateDto(CreateOrderDtoSchema), createOrder);

// Protected routes (require authentication)
router.get("/", authMiddleware, getOrders);
router.put(
  "/:id",
  authMiddleware,
  validateDto(UpdateOrderDtoSchema),
  updateOrder
);
router.patch(
  "/:id/status",
  authMiddleware,
  validateDto(UpdateOrderStatusDtoSchema),
  updateOrderStatus
);
router.delete("/:id", authMiddleware, deleteOrder);

// Test route for smoke testing
router.get("/test", (req, res) => {
  res.json({ message: "Orders API is working" });
});

export default router;
