import { serverConfig } from "~/config/config.server";
import {
  logApiErrorAndThrow,
  logParsingErrorAndThrow,
} from "~/utils/logApiError";

type FetchFromApiOptions = {
  url: string;
  errorMessage: string;
};

// this is a fixed identifier, which will later be replaced by a suitable authentication.
const userId = "PierreM";
const baseUrl = `${serverConfig().KOMPLA_API_URL}/api/v1`;

export async function fetchFromApi(options: FetchFromApiOptions) {
  const url = `${baseUrl}${options.url}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-User-ID": userId,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // 4xx and 5xx errors - log before throwing
      await logApiErrorAndThrow(response, options.errorMessage);
    }

    try {
      return await response.json();
    } catch (error) {
      const responseBody = await response.clone().text();
      logParsingErrorAndThrow(error, options.errorMessage, responseBody);
    }
  } catch (error) {
    // network errors
    throw new Error(options.errorMessage, { cause: error });
  }
}
