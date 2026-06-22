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

  console.error(`[API Error] ${context}`, {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    body: responseBody,
  });

  throw new Error(context, {
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
