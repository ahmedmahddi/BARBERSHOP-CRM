import { z } from "zod";

export const UploadImageDtoSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID").optional(),
  folder: z.string().optional(),
});

export type UploadImageDto = z.infer<typeof UploadImageDtoSchema>;
