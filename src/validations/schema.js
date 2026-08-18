import z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be at least 1 characters.")
    .max(20, "Username must be at most 20 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(1, "Please confirm your password."),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});
