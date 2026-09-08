import { ApiError } from "~/utils/apiError";
import { parseProblemDetails } from "~/utils/problemDetails.schema";

/**
 * Logs API error details (status + response body) before parsing.
 * Ensures error context is immediately available in stack traces.
 */
export async function logApiErrorAndThrow(
  response: Response,
  context: string,
): Promise<never> {
  let responseBody: string;

  try {
    responseBody = await response.clone().text();
  } catch {
    responseBody = "[Unable to read response body]";
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(responseBody);
  } catch {
    parsedBody = undefined;
  }

  const problemDetails = parseProblemDetails(parsedBody);

  console.error(`[API Error] ${context}`, {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    body: responseBody,
    problemDetails,
  });

  throw new ApiError(context, {
    status: response.status,
    problemDetails,
    cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}). Body: ${responseBody}`,
  });
}

/**
 * Logs parsing error with the original response for debugging.
 */
export function logParsingErrorAndThrow(
  error: unknown,
  context: string,
  responseBody: string,
): never {
  console.error(`[Parsing Error] ${context}`, {
    responseBody,
    error,
  });

  throw new Error(context, { cause: error });
}
