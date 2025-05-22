import { z } from "zod";

export const CreateServiceDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  duration: z.number().int().positive("Duration must be a positive number"),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z.string().url("Invalid URL").optional().nullable(),
});

export const UpdateServiceDtoSchema = CreateServiceDtoSchema.partial();

export type CreateServiceDto = z.infer<typeof CreateServiceDtoSchema>;
export type UpdateServiceDto = z.infer<typeof UpdateServiceDtoSchema>;
