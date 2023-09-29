import { z } from "zod";

const formFieldSchema = z.object({
  labelText: z.string(),
  inputName: z.string(),
  inputType: z.union([
    z.literal("text"),
    z.literal("password"),
    z.literal("email"),
    z.literal("number"),
    z.literal("checkbox"),
    z.literal("radio"),
    z.literal("file"),
    z.literal("date"),
    z.literal("time"),
    z.literal("datetime-local"),
    z.literal("month"),
    z.literal("week"),
    z.literal("url"),
    z.literal("search"),
    z.literal("tel"),
    z.literal("color"),
  ]),
  inputPlaceholder: z.string().optional(),
});

export const formDataSchema = z.object({
  formName: z.string(),
  formData: z.array(formFieldSchema),
});

export type FormObject = z.infer<typeof formDataSchema>;
