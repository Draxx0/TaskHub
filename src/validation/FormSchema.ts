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
  username: z.string().optional(),
  profilePicture: z.string().optional(),
});

const accountFormSchema = z.object({
  email: z.string().email().optional(),
  language: z.string().optional(),
});

const createWorkshopFormSchema = z.object({
  workshopTitle: z.string().min(4),
  workshopDescription: z.string().min(10),
  workshopImageBackground: z.string(),
});

const createBoardFormSchema = z.object({
  boardTitle: z.string().min(4),
  boardDescription: z.string().min(10),
});

export type authSigninFormObject = z.infer<typeof authSigninFormSchema>;
export type authLoginFormObject = z.infer<typeof authLoginFormSchema>;
export type profileFormObject = z.infer<typeof profileFormSchema>;
export type accountFormObject = z.infer<typeof accountFormSchema>;
export type createWorkshopFormObject = z.infer<typeof createWorkshopFormSchema>;
export type createBoardFormObject = z.infer<typeof createBoardFormSchema>;

export const authSchemas = {
  authSigninFormSchema,
  authLoginFormSchema,
};

export const settingsSchemas = {
  profileFormSchema,
  accountFormSchema,
};

export const workshopSchemas = {
  createWorkshopFormSchema,
};

export const boardSchemas = {
  createBoardFormSchema,
};
