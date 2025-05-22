import { z } from "zod";

export const OrderItemDtoSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  price: z.number().positive("Price must be a positive number"),
});

export const CreateOrderDtoSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(10, "Invalid phone number").optional(),
  items: z.array(OrderItemDtoSchema).min(1, "At least one item is required"),
  status: z
    .enum(["pending", "confirmed", "shipped", "delivered", "cancelled"])
    .default("pending"),
});

export const UpdateOrderDtoSchema = z.object({
  customerName: z.string().min(1, "Customer name is required").optional(),
  customerEmail: z.string().email("Invalid email").optional(),
  customerPhone: z.string().min(10, "Invalid phone number").optional(),
  status: z
    .enum(["pending", "confirmed", "shipped", "delivered", "cancelled"])
    .optional(),
});

export const UpdateOrderStatusDtoSchema = z.object({
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
});

export type OrderItemDto = z.infer<typeof OrderItemDtoSchema>;
export type CreateOrderDto = z.infer<typeof CreateOrderDtoSchema>;
export type UpdateOrderDto = z.infer<typeof UpdateOrderDtoSchema>;
export type UpdateOrderStatusDto = z.infer<typeof UpdateOrderStatusDtoSchema>;
