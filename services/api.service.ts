/**
 * API Service
 *
 * Generic service for making API requests with consistent error handling
 * and response formatting
 */

import { ApiError, ApiResponse } from "@santoori/core";

/**
 * Request options
 */
interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export class ApiService {
  private static readonly DEFAULT_TIMEOUT = 30000; // 30 seconds
  private static readonly BASE_HEADERS = {
    "Content-Type": "application/json",
  };

  /**
   * Make an API request
   */
  static async request<T>(
    url: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    const {
      method = "GET",
      headers = {},
      body,
      timeout = this.DEFAULT_TIMEOUT,
    } = options;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method,
        headers: {
          ...this.BASE_HEADERS,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        return {
          data: null,
          error: errorData,
          status: response.status,
        };
      }

      const data: T = await response.json();
      return {
        data,
        error: null,
        status: response.status,
      };
    } catch (error: any) {
      if (error.name === "AbortError") {
        return {
          data: null,
          error: {
            code: "TIMEOUT",
            message: "Request timeout",
          },
          status: 408,
        };
      }

      return {
        data: null,
        error: {
          code: "REQUEST_ERROR",
          message: error?.message || "An unexpected error occurred",
        },
        status: 500,
      };
    }
  }

  /**
   * GET request
   */
  static async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: "GET" });
  }

  /**
   * POST request
   */
  static async post<T>(url: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: "POST", body });
  }

  /**
   * PUT request
   */
  static async put<T>(url: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: "PUT", body });
  }

  /**
   * PATCH request
   */
  static async patch<T>(url: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: "PATCH", body });
  }

  /**
   * DELETE request
   */
  static async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: "DELETE" });
  }

  /**
   * Parse error response
   */
  private static async parseErrorResponse(
    response: Response,
  ): Promise<ApiError> {
    try {
      const data = await response.json();
      return {
        code: data.code || `HTTP_${response.status}`,
        message: data.message || response.statusText,
        details: data.details,
      };
    } catch {
      return {
        code: `HTTP_${response.status}`,
        message: response.statusText || "Unknown error",
      };
    }
  }
}
