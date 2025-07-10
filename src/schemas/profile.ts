import { z } from "zod";

export const profileSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "Zip code must be at least 5 digits"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type ProfileData = z.infer<typeof profileSchema>;
