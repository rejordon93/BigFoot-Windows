import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpData = z.infer<typeof signUpSchema>;
