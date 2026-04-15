/**
 * useFetch hook
 *
 * Generic hook for fetching data with loading, error, and success states
 */

import { useCallback, useEffect, useState } from "react";

import { AsyncState } from "@/types";

interface UseFetchOptions {
  immediate?: boolean;
  dependencies?: any[];
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = {},
): AsyncState<T> & {
  refetch: () => Promise<void>;
  reset: () => void;
} {
  const { immediate = true, dependencies = [] } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, isLoading: true, error: null });

    try {
      const result = await fetchFn();
      setState({ data: result, isLoading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        isLoading: false,
        error: error || new Error("An unexpected error occurred"),
      });
    }
  }, [fetchFn]);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, execute, JSON.stringify(dependencies)]);

  return {
    ...state,
    refetch: execute,
    reset: () => setState({ data: null, isLoading: false, error: null }),
  };
}
