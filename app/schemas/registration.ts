import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{9,10}$/),
  photo: z
    .any()
    .refine((file: FileList) => file?.length > 0, "Photo is required")
    .refine(
      (file: FileList) => {
        if (file) {
          return file[0]?.size < 1 * 1024 * 1024, "Limit 1MB"
        }
      }
    ),
});
