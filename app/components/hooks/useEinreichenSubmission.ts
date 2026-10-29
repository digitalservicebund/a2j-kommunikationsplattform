import type { SyntheticEvent } from "react";
import { useRef, useState } from "react";
import { useRevalidateWhilePending } from "~/components/hooks/useRevalidateWhilePending";
import { logger } from "~/utils/logger.client";

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

  useRevalidateWhilePending(isValidating || isBelegPending);

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
      logger.error({ error: err }, "Einreichung form submission error");
      setError(true);
      setIsSubmitting("idle");
    }
  };

  return { formRef, isSubmitting, error, handleSubmit };
}
