import { ApiError } from "~/utils/apiError";
import { logger } from "~/utils/logger.server";
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

  logger.error(
    {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      body: responseBody,
      problemDetails,
    },
    `API Error: ${context}`,
  );

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
  logger.error({ responseBody, err: error }, `Parsing Error: ${context}`);

  throw new Error(context, { cause: error });
}
