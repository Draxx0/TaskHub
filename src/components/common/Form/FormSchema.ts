import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type authFormObject = z.infer<typeof authFormSchema>;
