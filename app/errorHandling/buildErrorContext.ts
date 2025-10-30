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
};

export type BuildErrorContextOptions = {
  isDev: boolean;
  reportError: (error: unknown) => void;
};

export function buildErrorContext(
  error: Route.ErrorBoundaryProps["error"],
  locale: Language,
  options: BuildErrorContextOptions,
): ErrorContext {
  // Use explicit dictionaries here — hooks might cause issues outside React components.
  const { errorMessages, labels } = dictionaries[locale];

  let errorContent: ErrorContent = {
    label: errorMessages.GENERIC_ERROR_LABEL,
    heading: errorMessages.GENERIC_ERROR_HEADING,
    body: errorMessages.GENERIC_ERROR_BODY,
  };

  // Remix route errors
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
    // normal JS Error
    if (options.isDev) {
      // dev: show everything
      errorContent = {
        label: "Error",
        heading: error.message,
        body: error.stack || "",
      };
    } else {
      // prod: hide details, but report
      options.reportError(error);
      errorContent = {
        label: errorMessages.SERVER_ERROR_LABEL,
        heading: errorMessages.SERVER_ERROR_HEADING,
        body: errorMessages.SERVER_ERROR_BODY,
      };
    }
  } else {
    // handles throws that are not an Error instance nor a Remix RouteErrorResponse — e.g. a thrown string, number, or a Response object.
    options.reportError(error);
  }

  return { errorContent, labels };
}
