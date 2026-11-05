import { useEffect } from "react";
import { useRevalidator } from "react-router";

// Poll interval while e.g. a Validierungslauf is still running or a Beleg
// hasn't been finalized yet, so badges/alerts pick up the result without the
// user having to reload the page manually.
const DEFAULT_POLL_INTERVAL_MS = 5_000;

/**
 * Revalidates the page's loaders every `intervalMs` while `isPending` is true.
 */
export function useRevalidateWhilePending(
  isPending: boolean,
  intervalMs = DEFAULT_POLL_INTERVAL_MS,
) {
  const revalidator = useRevalidator();

  useEffect(() => {
    if (!isPending) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      if (revalidator.state === "idle") {
        void revalidator.revalidate();
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isPending, intervalMs, revalidator]);
}
