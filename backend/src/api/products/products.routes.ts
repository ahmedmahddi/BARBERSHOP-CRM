import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
} from "./products.controller";
import { validateDto } from "../../common/middleware/validate.middleware";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { CreateProductDtoSchema, UpdateProductDtoSchema } from "./products.dto";

const router = Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected routes (require authentication)
router.post(
  "/",
  authMiddleware,
  validateDto(CreateProductDtoSchema),
  createProduct
);
router.put(
  "/:id",
  authMiddleware,
  validateDto(UpdateProductDtoSchema),
  updateProduct
);
router.delete("/:id", authMiddleware, deleteProduct);
router.patch("/:id/stock", authMiddleware, updateProductStock);

// Test route for smoke testing
router.get("/test", (req, res) => {
  res.json({ message: "Products API is working" });
});

export default router;
