import { isRouteErrorResponse } from "react-router";
import { dictionaries, Locale } from "~/services/translations";
import { Route } from "../../+types/root";

export type ErrorContent = {
  label: string;
  heading: string;
  body: string;
  redirectText: string;
  redirectUrl: string;
};

export type BuildErrorContentOptions = {
  locale: Locale;
  isDev: boolean;
};

export function buildErrorContent(
  error: Route.ErrorBoundaryProps["error"],
  { locale, isDev }: BuildErrorContentOptions,
): ErrorContent {
  const { errorMessages, shared } = dictionaries[locale];

  const errorContentByResponseStatus: Record<number, ErrorContent> = {
    404: {
      label: errorMessages.UNKNOWN_PAGE_LABEL,
      heading: errorMessages.UNKNOWN_PAGE_HEADING,
      body: errorMessages.UNKNOWN_PAGE_BODY,
      redirectText: shared.TO_START_PAGE_LABEL,
      redirectUrl: "/",
    },
    500: {
      label: errorMessages.SERVER_ERROR_LABEL,
      heading: errorMessages.SERVER_ERROR_HEADING,
      body: errorMessages.SERVER_ERROR_BODY,
      redirectText: shared.CONTACT_SUPPORT_LABEL,
      redirectUrl: "/hilfe-und-kontakt",
    },
  };

  if (isRouteErrorResponse(error)) {
    // Render specific message for known status codes, otherwise 500
    return (
      errorContentByResponseStatus[error.status] ??
      errorContentByResponseStatus[500]
    );
  }

  // Display the full error stack trace during development
  if (error instanceof Error && isDev) {
    return {
      label: "Error",
      heading: error.message,
      body: error.stack || "",
      redirectText: shared.TO_START_PAGE_LABEL,
      redirectUrl: "/",
    };
  }

  // If all else fails, fall back to generic error content
  return {
    label: errorMessages.GENERIC_ERROR_LABEL,
    heading: errorMessages.GENERIC_ERROR_HEADING,
    body: errorMessages.GENERIC_ERROR_BODY,
    redirectText: shared.CONTACT_SUPPORT_LABEL,
    redirectUrl: "/hilfe-und-kontakt",
  };
}
