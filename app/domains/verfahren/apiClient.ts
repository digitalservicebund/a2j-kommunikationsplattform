import z from "zod";
import { config } from "~/config/config";
import { serverConfig } from "~/config/config.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import {
  logApiErrorAndThrow,
  logParsingErrorAndThrow,
} from "~/utils/logApiError";

type ApiRequestUrlOptions =
  | {
      path: string;
      fullUrl?: never;
    }
  | {
      path?: never;
      fullUrl: string;
    };

type ApiRequestOptions = ApiRequestUrlOptions & {
  authData: AuthenticationResponse;
  method?: string;
  body?: unknown;
  eTag?: string;
  headers?: Record<string, string>;
  includeResponseETag?: boolean;
  includeResponseMeta?: boolean;
  throwOnError?: boolean;
  schema?: z.ZodTypeAny;
  errorMessage?: string; // error message used for logging/parsing helpers
};

export type ApiRequestWithETagResult<T> = {
  data: T;
  eTag: string | null;
};

export type ApiRequestWithMetaResult<T> = {
  data: T;
  status: number;
  headers: Headers;
  eTag: string | null;
};

export type ApiRequestErrorResult = {
  ok: false;
  status: number;
  headers: Headers;
  eTag: string | null;
  errorBody: unknown;
};

export type ApiRequestSuccessResult<T> = {
  ok: true;
  data: T;
  status: number;
  headers: Headers;
  eTag: string | null;
};

export type ApiRequestHandledResult<T> =
  ApiRequestSuccessResult<T> | ApiRequestErrorResult;

function parseSchemaOrThrow<T>(
  data: unknown,
  schema: z.ZodTypeAny | undefined,
  errorMessage: string,
): T {
  if (!schema) {
    return data as T;
  }

  try {
    return schema.parse(data) as T;
  } catch (err) {
    logParsingErrorAndThrow(err, errorMessage, JSON.stringify(data));
  }
}

async function handleNonOkResponse(
  response: Response,
  responseETag: string | null,
  throwOnError: boolean,
  errorMessage: string,
): Promise<ApiRequestErrorResult | undefined> {
  if (throwOnError) {
    await logApiErrorAndThrow(response, errorMessage);
    return undefined;
  }

  let errorBody: unknown;

  try {
    errorBody = await response.json();
  } catch {
    errorBody = undefined;
  }

  return {
    ok: false,
    status: response.status,
    headers: response.headers,
    eTag: responseETag,
    errorBody,
  };
}

type ResponseBodyType = Response & {
  status?: number;
  headers?: Headers;
};

function hasNoResponseBody(responseBody: ResponseBodyType): boolean {
  if (responseBody.status === 204 || responseBody.status === 205) {
    return true;
  }

  const contentLength = responseBody.headers?.get("content-length");
  return contentLength === "0";
}

async function readResponseBody(
  response: Response,
  errorMessage: string,
): Promise<unknown> {
  // 204/205 responses intentionally have no body.
  if (hasNoResponseBody(response)) {
    return undefined;
  }

  try {
    return await response.json();
  } catch (error) {
    logParsingErrorAndThrow(error, errorMessage, "[unparsable JSON response]");
  }
}

function buildSuccessReturn<T>(
  data: T,
  response: Response,
  responseETag: string | null,
  options: {
    throwOnError: boolean;
    includeResponseMeta: boolean;
    includeResponseETag: boolean;
  },
):
  | T
  | ApiRequestWithETagResult<T>
  | ApiRequestWithMetaResult<T>
  | ApiRequestSuccessResult<T> {
  if (!options.throwOnError) {
    return {
      ok: true,
      data,
      status: response.status,
      headers: response.headers,
      eTag: responseETag,
    };
  }

  if (options.includeResponseMeta) {
    return {
      data,
      status: response.status,
      headers: response.headers,
      eTag: responseETag,
    };
  }

  if (options.includeResponseETag) {
    return {
      data,
      eTag: responseETag,
    };
  }

  return data;
}

export function apiRequest<T = unknown>(
  opts: ApiRequestOptions & { throwOnError: false },
): Promise<ApiRequestHandledResult<T>>;
export function apiRequest<T = unknown>(
  opts: ApiRequestOptions & { includeResponseMeta: true },
): Promise<ApiRequestWithMetaResult<T>>;
export function apiRequest<T = unknown>(
  opts: ApiRequestOptions & { includeResponseETag: true },
): Promise<ApiRequestWithETagResult<T>>;
export function apiRequest<T = unknown>(opts: ApiRequestOptions): Promise<T>;

export async function apiRequest<T = unknown>(
  opts: ApiRequestOptions,
): Promise<
  | T
  | ApiRequestWithETagResult<T>
  | ApiRequestWithMetaResult<T>
  | ApiRequestHandledResult<T>
> {
  const {
    authData,
    path,
    fullUrl,
    method = "GET",
    body,
    eTag,
    headers: customHeaders,
    includeResponseETag = false,
    includeResponseMeta = false,
    throwOnError = true,
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
    Accept: "application/json",
    ...customHeaders,
  };

  let fetchBody: BodyInit | undefined;

  // If body is FormData, let fetch set the content-type boundary
  if (body instanceof FormData) {
    fetchBody = body as unknown as BodyInit;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    fetchBody = JSON.stringify(body) as BodyInit;
  }

  // If eTag is present, add it as header
  if (eTag) {
    headers["If-Match"] = eTag;
  }

  // This can result in carrier tokens and payload data being exposed
  // in the logs. Therefore, this is only logged in non-production environments for now
  const logWithHeaderAndBody =
    config().ENVIRONMENT === "staging" ||
    config().ENVIRONMENT === "development";
  if (logWithHeaderAndBody) {
    const logHeaders = headers ? `headers: ${JSON.stringify(headers)}` : "";
    const logBody = body ? `body: ${JSON.stringify(fetchBody)}` : "";
    const logETag = eTag ? `eTag: ${eTag}` : "";
    console.log(`fetch ${method} ${url} ${logHeaders} ${logBody} ${logETag}`);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: fetchBody,
  });

  const responseHeaders = (
    response as Response & {
      headers?: Headers;
    }
  ).headers;
  const responseETag = responseHeaders?.get("etag") ?? null;
  const resolvedErrorMessage = errorMessage ?? "API request failed.";

  if (!response.ok) {
    const nonOkResult = await handleNonOkResponse(
      response,
      responseETag,
      throwOnError,
      resolvedErrorMessage,
    );

    if (nonOkResult) {
      return nonOkResult;
    }
  }

  const responseBody = await readResponseBody(
    response,
    errorMessage ?? "Failed to read/parse the response as JSON.",
  );
  const parsedData = parseSchemaOrThrow<T>(
    responseBody,
    schema,
    errorMessage ?? "Failed to parse Zod schema.",
  );

  return buildSuccessReturn(parsedData, response, responseETag, {
    throwOnError,
    includeResponseMeta,
    includeResponseETag,
  });
}

export default apiRequest;
