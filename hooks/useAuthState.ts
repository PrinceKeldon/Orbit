/**
 * useAuthState hook
 *
 * Manages authentication state for the application
 */

import { useEffect, useState } from "react";
import { AuthState } from "@santoori/core";

import { AuthService } from "@/services";

export function useAuthState() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isSigningIn: false,
    isSigningUp: false,
    error: null,
  });

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        const session = await AuthService.getSession();

        setAuthState((prev) => ({
          ...prev,
          user: currentUser,
          session,
          isLoading: false,
        }));
      } catch (error: any) {
        setAuthState((prev) => ({
          ...prev,
          error,
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isSigningIn: true, error: null }));

    const response = await AuthService.signIn(email, password);

    if (response.error) {
      setAuthState((prev) => ({
        ...prev,
        isSigningIn: false,
        error: new Error(response.error.message),
      }));
      return { success: false, error: response.error.message };
    }

    setAuthState((prev) => ({
      ...prev,
      user: response.data,
      isSigningIn: false,
    }));

    return { success: true };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    setAuthState((prev) => ({ ...prev, isSigningUp: true, error: null }));

    const response = await AuthService.signUp(email, password, fullName);

    if (response.error) {
      setAuthState((prev) => ({
        ...prev,
        isSigningUp: false,
        error: new Error(response.error.message),
      }));
      return { success: false, error: response.error.message };
    }

    setAuthState((prev) => ({
      ...prev,
      user: response.data,
      isSigningUp: false,
    }));

    return { success: true };
  };

  const signOut = async () => {
    const response = await AuthService.signOut();

    if (response.error) {
      setAuthState((prev) => ({
        ...prev,
        error: new Error(response.error.message),
      }));
      return { success: false, error: response.error.message };
    }

    setAuthState((prev) => ({
      ...prev,
      user: null,
      session: null,
    }));

    return { success: true };
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  };
}
