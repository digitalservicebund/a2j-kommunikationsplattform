import z from "zod";
import { serverConfig } from "~/config/config.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import {
  logApiErrorAndThrow,
  logParsingErrorAndThrow,
} from "~/utils/logApiError";

type ApiRequestOptions = {
  authData: AuthenticationResponse;
  path?: string; // path relative to KOMPLA_API_URL
  fullUrl?: string; // optional absolute URL — used when caller builds URL with search params
  method?: string;
  body?: unknown;
  schema?: z.ZodTypeAny;
  errorMessage?: string; // error message used for logging/parsing helpers
};

export async function apiRequest<T = unknown>(
  opts: ApiRequestOptions,
): Promise<T> {
  const {
    authData,
    path,
    fullUrl,
    method = "GET",
    body,
    schema,
    errorMessage,
  } = opts;

  const bearerToken = await getBearerToken(authData);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const url = fullUrl ?? `${serverConfig().KOMPLA_API_URL}${path}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${bearerToken}`,
  };

  let fetchBody: BodyInit | undefined;

  // If body is FormData, let fetch set the content-type boundary
  if (body instanceof FormData) {
    fetchBody = body as unknown as BodyInit;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    fetchBody = JSON.stringify(body) as BodyInit;
  }

  console.log(
    `Verfahren apiClient :: fetch ${method} ${url}\nheaders: ${JSON.stringify(headers)}\nbody: ${fetchBody}`,
  );

  const response = await fetch(url, {
    method,
    headers,
    body: fetchBody,
  });

  if (!response.ok) {
    await logApiErrorAndThrow(response, errorMessage ?? "API request failed.");
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (err) {
    const responseBody = await response.clone().text();
    logParsingErrorAndThrow(
      err,
      errorMessage ?? "Failed to read/parse the response as JSON.",
      responseBody,
    );
  }

  if (schema) {
    try {
      return schema.parse(data) as T;
    } catch (err) {
      logParsingErrorAndThrow(
        err,
        errorMessage ?? "Failed to parse Zod schema.",
        JSON.stringify(data),
      );
    }
  }

  return data as T;
}

export default apiRequest;
