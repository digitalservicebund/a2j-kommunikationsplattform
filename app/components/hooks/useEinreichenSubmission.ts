import type { SyntheticEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRevalidator } from "react-router";

// Poll interval while the Einreichung's Validierungslauf is still running or
// the Beleg hasn't been finalized yet, so badges/alerts pick up the result
// without the user having to reload the page manually.
const VALIDIERUNGSSTATUS_POLL_INTERVAL_MS = 5_000;

type UseEinreichenSubmissionOptions = {
  isValidating: boolean;
  isBelegPending: boolean;
};

/**
 * useEinreichenSubmission custom hook
 *
 * Bundles the client-side submit flow for the "Klage einreichen" Form
 * (fetch-then-real-submit, so failures surface without a full navigation)
 * together with the background polling that keeps the page's readiness/Beleg
 * data fresh while a Validierungslauf or Beleg is still in progress.
 */
export function useEinreichenSubmission({
  isValidating,
  isBelegPending,
}: UseEinreichenSubmissionOptions) {
  const [isSubmitting, setIsSubmitting] = useState<"idle" | "submitting">(
    "idle",
  );
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const revalidator = useRevalidator();

  useEffect(() => {
    if (!isValidating && !isBelegPending) {
      return;
    }

    const intervalId = setInterval(() => {
      if (revalidator.state === "idle") {
        revalidator.revalidate();
      }
    }, VALIDIERUNGSSTATUS_POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isValidating, isBelegPending, revalidator]);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    setIsSubmitting("submitting");

    const formData = new FormData(formRef.current!);

    try {
      const response = await fetch(globalThis.location.href, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError(true);
        setIsSubmitting("idle");
        return;
      }

      // success - redirect will happen via action
      formRef.current?.submit();
    } catch (err) {
      console.error("Einreichung form submission error:", err);
      setError(true);
      setIsSubmitting("idle");
    }
  };

  return { formRef, isSubmitting, error, handleSubmit };
}
