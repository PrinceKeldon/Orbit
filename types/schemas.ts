/**
 * Zod validation schemas for API and form inputs
 *
 * Provides runtime type checking and validation for:
 * - Authentication
 * - User profiles
 * - Form inputs
 * - API responses
 */

import { z } from "zod";

/**
 * Authentication Schemas
 */

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    fullName: z.string().optional().nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

/**
 * User Profile Schemas
 */

export const UpdateProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required").optional(),
  avatarUrl: z.string().url("Invalid URL").optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

/**
 * Generic validation helpers
 */

/**
 * Validate data against a schema
 */
export function validateData<T>(
  schema: z.ZodSchema,
  data: unknown,
): { valid: boolean; data?: T; errors?: z.ZodError } {
  try {
    const validatedData = schema.parse(data);
    return { valid: true, data: validatedData as T };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error };
    }
    throw error;
  }
}

/**
 * Get validation errors as a map
 */
export function getValidationErrorMap(
  errors: z.ZodError,
): Record<string, string> {
  const errorMap: Record<string, string> = {};

  errors.errors.forEach((error) => {
    const path = error.path.join(".");
    errorMap[path] = error.message;
  });

  return errorMap;
}
