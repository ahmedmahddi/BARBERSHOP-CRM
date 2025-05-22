import { z } from "zod";

// NOTE: v1 - keep in sync with frontend BookingFormData
export const CreateBookingDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Invalid phone number"),
  barberId: z.string().uuid("Invalid barber ID"),
  serviceId: z.string().uuid("Invalid service ID"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  comments: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  agreement: z.preprocess(
    val => (val === "true" ? true : val === "false" ? false : val),
    z.boolean().refine(val => val === true, { message: 'You must accept the agreement.' })
  ),
  status: z.enum(["confirmed", "pending", "cancelled"]).default("pending"),
});

// NOTE: v1 - keep in sync with frontend BookingFormData
export const UpdateBookingDtoSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(8, "Invalid phone number").optional(),
  barberId: z.string().uuid("Invalid barber ID").optional(),
  serviceId: z.string().uuid("Invalid service ID").optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .optional(),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)")
    .optional(),
  comments: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
  agreement: z.boolean().optional(),
  status: z.enum(["confirmed", "pending", "cancelled"]).optional(),
});

export const UpdateBookingStatusDtoSchema = z.object({
  status: z.enum(["confirmed", "pending", "cancelled"]),
});

export type CreateBookingDto = z.infer<typeof CreateBookingDtoSchema>;
export type UpdateBookingDto = z.infer<typeof UpdateBookingDtoSchema>;
export type UpdateBookingStatusDto = z.infer<
  typeof UpdateBookingStatusDtoSchema
>;
