import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters."
  }),
  description: z.string()
});

export type UserFormValues = z.infer<typeof userFormSchema>;
