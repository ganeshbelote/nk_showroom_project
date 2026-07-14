import { useState } from "react";

export function useAsync() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function execute<T>(
    callback: () => Promise<T>
  ): Promise<T | undefined> {
    try {
      setLoading(true);
      setError(null);

      return await callback();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    execute,
  };
}