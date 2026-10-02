import { data } from "react-router";
import { ValidationProblemDetails } from "~/utils/problemDetails.schema";

export class ApiError extends Error {
  readonly status: number;
  readonly problemDetails: ValidationProblemDetails | undefined;

  constructor(
    message: string,
    options: {
      status: number;
      problemDetails?: ValidationProblemDetails;
      cause?: unknown;
    },
  ) {
    super(message, { cause: options.cause });
    this.name = "ApiError";
    this.status = options.status;
    this.problemDetails = options.problemDetails;
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}

export function isClientSideApiError(e: unknown): e is ApiError {
  return isApiError(e) && e.status >= 400 && e.status < 500;
}

/**
 * Turns an API 404 into a route 404 so the ErrorBoundary renders the
 * "page not found" content instead of a generic server error. Meant to be
 * used as a `.catch` handler in loaders; any other error is rethrown as is.
 */
export function rethrowApiNotFoundAsRouteError(error: unknown): never {
  if (error instanceof ApiError && error.status === 404) {
    throw data(null, { status: 404 });
  }

  throw error;
}
