// schemas/quote.ts
import { z } from "zod";

export const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  zip: z.string().min(5, "Zip code is required"),
  serviceType: z.string().min(3, "Service type is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  additionalDetails: z.string().optional(),
});

export type QuoteData = z.infer<typeof quoteSchema>;
