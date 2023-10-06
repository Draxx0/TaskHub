import { z } from "zod";

const authSigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  profile: z.string().url(),
});

const authLoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const profileFormSchema = z.object({
  username: z.string(),
});

const accountFormSchema = z.object({
  email: z.string().email().optional(),
  language: z.string().optional(),
});

export type authSigninFormObject = z.infer<typeof authSigninFormSchema>;
export type authLoginFormObject = z.infer<typeof authLoginFormSchema>;
export type profileFormObject = z.infer<typeof profileFormSchema>;
export type accountFormObject = z.infer<typeof accountFormSchema>;

export const authSchemas = {
  authSigninFormSchema,
  authLoginFormSchema,
};

export const settingsSchema = {
  profileFormSchema,
  accountFormSchema,
};
