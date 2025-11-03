import { isRouteErrorResponse } from "react-router";
import { dictionaries, Language } from "~/services/translations";
import { Route } from "../+types/root";

export type ErrorContent = {
  label: string;
  heading: string;
  body: string;
  redirectText: string;
  redirectUrl: string;
};

export type ErrorContext = {
  errorContent: ErrorContent;
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
    redirectText: labels.TO_START_PAGE_LABEL,
    redirectUrl: "/",
  };

  // for now it's just 404 and 500, but we can expand this later by just adding a new entry here
  const errorContentPerStatus: Record<number, ErrorContent> = {
    404: {
      label: errorMessages.UNKNOWN_PAGE_LABEL,
      heading: errorMessages.UNKNOWN_PAGE_HEADING,
      body: errorMessages.UNKNOWN_PAGE_BODY,
      redirectText: labels.TO_START_PAGE_LABEL,
      redirectUrl: "/",
    },
    500: {
      label: errorMessages.SERVER_ERROR_LABEL,
      heading: errorMessages.SERVER_ERROR_HEADING,
      body: errorMessages.SERVER_ERROR_BODY,
      redirectText: labels.CONTACT_SUPPORT_LABEL,
      redirectUrl: "/hilfe-und-kontakt",
    },
  };

  let errorToReport: unknown;

  if (isRouteErrorResponse(error)) {
    // render specific message for known status codes, otherwise 500
    errorContent =
      errorContentPerStatus[error.status] ?? errorContentPerStatus[500];
  } else if (error instanceof Error) {
    if (isDev) {
      // show full error details in dev
      errorContent = {
        label: "Error",
        heading: error.message,
        body: error.stack || "",
        redirectText: labels.TO_START_PAGE_LABEL,
        redirectUrl: "/",
      };
    } else {
      // production: report and render 500 message
      errorToReport = error;
      errorContent = errorContentPerStatus[500];
    }
  } else {
    // non-Error throws: mark for reporting and keep generic message
    errorToReport = error;
  }

  return { errorContent, errorToReport };
}
