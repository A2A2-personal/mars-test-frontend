import { z } from "zod";
import { registrationSchema } from "~/schemas/registration";

export type RegistrationData = z.infer<typeof registrationSchema>;
