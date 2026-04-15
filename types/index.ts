/**
 * Core type definitions for the ORBIT-Mobile application
 */

/**
 * Application user model
 */
export interface AppUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

/**
 * Authentication state
 */
export interface AuthState {
  user: AppUser | null;
  session: any | null;
  isLoading: boolean;
  isSigningIn: boolean;
  isSigningUp: boolean;
  error: Error | null;
}

/**
 * API Response wrapper for type-safe API calls
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  status: number;
}

/**
 * Standard API error format
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  error: ApiError | null;
}

/**
 * Navigation parameters for typed routing
 */
export interface NavigationParams {
  [key: string]: any;
}

/**
 * Theme configuration
 */
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

/**
 * Loading state for async operations
 */
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
