/**
 * Authentication Service
 *
 * Handles user authentication, session management, and user profile operations
 */

import { ApiResponse, AppUser } from "@santoori/core";

import { supabase } from "@/lib/supabase";

export class AuthService {
  /**
   * Sign up a new user
   */
  static async signUp(
    email: string,
    password: string,
    fullName?: string,
  ): Promise<ApiResponse<AppUser>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return {
          data: null,
          error: {
            code: error.code || "SIGNUP_ERROR",
            message: error.message,
          },
          status: 400,
        };
      }

      if (!data.user) {
        return {
          data: null,
          error: {
            code: "SIGNUP_ERROR",
            message: "User creation failed",
          },
          status: 400,
        };
      }

      return {
        data: this.mapSupabaseUserToAppUser(data.user),
        error: null,
        status: 201,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "SIGNUP_ERROR",
          message: error?.message || "An unexpected error occurred",
        },
        status: 500,
      };
    }
  }

  /**
   * Sign in with email and password
   */
  static async signIn(
    email: string,
    password: string,
  ): Promise<ApiResponse<AppUser>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          data: null,
          error: {
            code: error.code || "SIGNIN_ERROR",
            message: error.message,
          },
          status: 401,
        };
      }

      if (!data.user) {
        return {
          data: null,
          error: {
            code: "SIGNIN_ERROR",
            message: "Sign in failed",
          },
          status: 401,
        };
      }

      return {
        data: this.mapSupabaseUserToAppUser(data.user),
        error: null,
        status: 200,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "SIGNIN_ERROR",
          message: error?.message || "An unexpected error occurred",
        },
        status: 500,
      };
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          data: null,
          error: {
            code: error.code || "SIGNOUT_ERROR",
            message: error.message,
          },
          status: 400,
        };
      }

      return {
        data: null,
        error: null,
        status: 200,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "SIGNOUT_ERROR",
          message: error?.message || "An unexpected error occurred",
        },
        status: 500,
      };
    }
  }

  /**
   * Get current user session
   */
  static async getSession() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  }

  /**
   * Get current authenticated user
   */
  static async getCurrentUser(): Promise<AppUser | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user ? this.mapSupabaseUserToAppUser(user) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  /**
   * Update user metadata
   */
  static async updateProfile(fullName: string): Promise<ApiResponse<AppUser>> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (error) {
        return {
          data: null,
          error: {
            code: error.code || "UPDATE_ERROR",
            message: error.message,
          },
          status: 400,
        };
      }

      if (!data.user) {
        return {
          data: null,
          error: {
            code: "UPDATE_ERROR",
            message: "Profile update failed",
          },
          status: 400,
        };
      }

      return {
        data: this.mapSupabaseUserToAppUser(data.user),
        error: null,
        status: 200,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "UPDATE_ERROR",
          message: error?.message || "An unexpected error occurred",
        },
        status: 500,
      };
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(email: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        return {
          data: null,
          error: {
            code: error.code || "RESET_ERROR",
            message: error.message,
          },
          status: 400,
        };
      }

      return {
        data: null,
        error: null,
        status: 200,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "RESET_ERROR",
          message: error?.message || "An unexpected error occurred",
        },
        status: 500,
      };
    }
  }

  /**
   * Map Supabase user to AppUser type
   */
  private static mapSupabaseUserToAppUser(user: any): AppUser {
    return {
      id: user.id,
      email: user.email || "",
      full_name: user.user_metadata?.full_name,
      avatar_url: user.user_metadata?.avatar_url,
      created_at: user.created_at,
      updated_at: user.updated_at,
      metadata: user.user_metadata,
    };
  }
}
