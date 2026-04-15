/**
 * Service layer for business logic and API interactions
 *
 * This folder contains services for:
 * - API communication
 * - Data fetching and transformation
 * - Business logic
 * - Third-party integrations
 */

export * from "./api.service";
export * from "./auth.service";
export * from "./user.service";
// Re-export types for convenience
export type { ApiError, ApiResponse } from "@/types";
