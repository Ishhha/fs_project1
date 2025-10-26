import { useEffect, useState } from "react";

/**
 * useSSE
 * Hook for connecting to a Server-Sent Events (SSE) stream and reading messages.
 * Accepts a URL and optional headers.
 */

export function useSSE<T = any>(url: string, headers?: Record<string, string>) {
  const [events, setEvents] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = new EventSource(url, { withCredentials: false } as any);
    console.log("🔌 SSE connected:", url);

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setEvents((prev) => [...prev, data]);
      } catch (e) {
        console.warn("Invalid SSE message:", event.data);
      }
    };

    source.onerror = (err) => {
      console.error("SSE error", err);
      setError("SSE connection error");
      source.close();
    };

    return () => {
      console.log("SSE closed:", url);
      source.close();
    };
  }, [url]);

  return { events, error };
}
