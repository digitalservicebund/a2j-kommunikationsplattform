import { isRouteErrorResponse } from "react-router";
import { dictionaries, Language } from "~/services/translations";
import { Route } from "../+types/root";

export type ErrorContent = {
  label: string;
  heading: string;
  body: string;
};

export type ErrorContext = {
  errorContent: ErrorContent;
  labels: (typeof dictionaries)[Language]["labels"];
  errorToReport?: unknown;
};

export function buildErrorContext(
  error: Route.ErrorBoundaryProps["error"],
  locale: Language,
  isDev: boolean,
): ErrorContext {
  const { errorMessages, labels } = dictionaries[locale];

  let errorContent: ErrorContent = {
    label: errorMessages.GENERIC_ERROR_LABEL,
    heading: errorMessages.GENERIC_ERROR_HEADING,
    body: errorMessages.GENERIC_ERROR_BODY,
  };

  let errorToReport: unknown;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorContent = {
        label: errorMessages.UNKNOWN_PAGE_LABEL,
        heading: errorMessages.UNKNOWN_PAGE_HEADING,
        body: errorMessages.UNKNOWN_PAGE_BODY,
      };
    } else {
      errorContent = {
        label: errorMessages.SERVER_ERROR_LABEL,
        heading: errorMessages.SERVER_ERROR_HEADING,
        body: errorMessages.SERVER_ERROR_BODY,
      };
    }
  } else if (error instanceof Error) {
    if (isDev) {
      // show full error details in dev
      errorContent = {
        label: "Error",
        heading: error.message,
        body: error.stack || "",
      };
    } else {
      // production: report and render 500 message
      errorToReport = error;
      errorContent = {
        label: errorMessages.SERVER_ERROR_LABEL,
        heading: errorMessages.SERVER_ERROR_HEADING,
        body: errorMessages.SERVER_ERROR_BODY,
      };
    }
  } else {
    // non-Error throws: mark for reporting and keep generic message
    errorToReport = error;
  }

  return { errorContent, labels, errorToReport };
}
