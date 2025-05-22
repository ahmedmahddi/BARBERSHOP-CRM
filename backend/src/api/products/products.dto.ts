import { z } from "zod";

export const CreateProductDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z.string().url("Invalid URL").optional().nullable(),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
});

export const UpdateProductDtoSchema = CreateProductDtoSchema.partial();

export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;
export type UpdateProductDto = z.infer<typeof UpdateProductDtoSchema>;
