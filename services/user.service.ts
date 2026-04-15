/**
 * User Service
 *
 * Service for user-related API calls and data operations
 */

import { ApiResponse, AppUser, PaginatedResponse } from "@santoori/core";

import { supabase } from "@/lib/supabase";

export class UserService {
  private static readonly TABLE = "users";

  /**
   * Fetch user profile by ID
   */
  static async getUserById(userId: string): Promise<ApiResponse<AppUser>> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE)
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        return {
          data: null,
          error: {
            code: error.code || "FETCH_ERROR",
            message: error.message,
          },
          status: 400,
        };
      }

      return {
        data: this.mapDatabaseUserToAppUser(data),
        error: null,
        status: 200,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "FETCH_ERROR",
          message: error?.message || "Failed to fetch user",
        },
        status: 500,
      };
    }
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(
    query: string,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<AppUser>> {
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from(this.TABLE)
        .select("*", { count: "exact" })
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
        .range(from, to);

      if (error) {
        return {
          data: [],
          meta: { page, pageSize, total: 0, hasMore: false },
          error: {
            code: error.code || "SEARCH_ERROR",
            message: error.message,
          },
        };
      }

      const total = count || 0;
      const hasMore = from + pageSize < total;

      return {
        data: data
          ? data.map((user) => this.mapDatabaseUserToAppUser(user))
          : [],
        meta: { page, pageSize, total, hasMore },
        error: null,
      };
    } catch (error: any) {
      return {
        data: [],
        meta: { page, pageSize, total: 0, hasMore: false },
        error: {
          code: "SEARCH_ERROR",
          message: error?.message || "Failed to search users",
        },
      };
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(
    userId: string,
    updates: Partial<AppUser>,
  ): Promise<ApiResponse<AppUser>> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE)
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

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

      return {
        data: this.mapDatabaseUserToAppUser(data),
        error: null,
        status: 200,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "UPDATE_ERROR",
          message: error?.message || "Failed to update user profile",
        },
        status: 500,
      };
    }
  }

  /**
   * Delete user account
   */
  static async deleteUser(userId: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from(this.TABLE)
        .delete()
        .eq("id", userId);

      if (error) {
        return {
          data: null,
          error: {
            code: error.code || "DELETE_ERROR",
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
          code: "DELETE_ERROR",
          message: error?.message || "Failed to delete user",
        },
        status: 500,
      };
    }
  }

  /**
   * Upload user avatar
   */
  static async uploadAvatar(
    userId: string,
    file: File | Blob,
  ): Promise<ApiResponse<{ url: string }>> {
    try {
      const fileExt = this.getFileExtension(file);
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("user-uploads")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        return {
          data: null,
          error: {
            code: "UPLOAD_ERROR",
            message: uploadError.message,
          },
          status: 400,
        };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("user-uploads").getPublicUrl(filePath);

      return {
        data: { url: publicUrl },
        error: null,
        status: 200,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          code: "UPLOAD_ERROR",
          message: error?.message || "Failed to upload avatar",
        },
        status: 500,
      };
    }
  }

  /**
   * Map database user to AppUser
   */
  private static mapDatabaseUserToAppUser(user: any): AppUser {
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
      updated_at: user.updated_at,
      metadata: user.metadata,
    };
  }

  /**
   * Get file extension from file type
   */
  private static getFileExtension(file: File | Blob): string {
    const type = file.type;
    if (type === "image/jpeg") return "jpg";
    if (type === "image/png") return "png";
    if (type === "image/gif") return "gif";
    if (type === "image/webp") return "webp";
    return "jpg";
  }
}
