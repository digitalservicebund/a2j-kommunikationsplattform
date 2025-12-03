import z from "zod";
import { serverConfig } from "~/config/config.server";
import { newVerfahrenSchema } from "~/models/VerfahrenSchema";

import { getBearerToken } from "~/services/auth/getBearerToken.server";

const fetchVerfahrenOptionsSchema = z.object({
  offset: z.number().int().nonnegative().optional(),
  limit: z.number().int().positive().optional(),
  gericht: z.guid().optional().or(z.literal("")),
});

export type FetchVerfahrenOptions = z.infer<typeof fetchVerfahrenOptionsSchema>;

const ERROR_MESSAGE = "Die Verfahren konnten nicht abgerufen werden.";

function buildSearchParams<T extends Record<string, unknown>>(
  options: T,
): URLSearchParams {
  const params = new URLSearchParams();

  (Object.entries(options) as [keyof T, T[keyof T]][]).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        typeof value !== "object"
      ) {
        params.set(String(key), String(value));
      }
    },
  );

  return params;
}

export default async function fetchVerfahren(
  request: Request,
  options?: FetchVerfahrenOptions,
) {
  const bearerToken = await getBearerToken(request);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const parsed = fetchVerfahrenOptionsSchema.parse(options ?? {});

  const url = new URL(`${serverConfig().KOMPLA_API_URL}/api/v1/verfahren`);
  const searchParams = buildSearchParams(parsed);

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
    });
  }

  const data = await response.json();

  try {
    return newVerfahrenSchema.array().parse(data);
  } catch (error) {
    throw new Error(ERROR_MESSAGE, { cause: error });
  }
}
