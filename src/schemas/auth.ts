// schemas/auth.ts (or @/schemas/auth.ts)
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginProps = z.infer<typeof loginSchema>;
