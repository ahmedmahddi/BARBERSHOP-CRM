import { z } from "zod";

export const CreateBarberDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().nullable(),
  phone: z.string().min(10, "Invalid phone number").optional().nullable(),
  description: z.string().optional().nullable(),
  photoUrl: z.string().url("Invalid URL").optional().nullable(),
});

export const UpdateBarberDtoSchema = CreateBarberDtoSchema.partial();

export const GetBarberAvailabilityDtoSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  serviceId: z.string().uuid("Invalid service ID"),
});

export type CreateBarberDto = z.infer<typeof CreateBarberDtoSchema>;
export type UpdateBarberDto = z.infer<typeof UpdateBarberDtoSchema>;
export type GetBarberAvailabilityDto = z.infer<
  typeof GetBarberAvailabilityDtoSchema
>;
