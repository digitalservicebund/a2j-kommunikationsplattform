import z from "zod";
import { serverConfig } from "~/config/config.server";
import { sortOptions } from "~/config/verfahren";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { buildSearchParams } from "~/utils/buildSearchParams";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

const fetchVerfahrenOptionsSchema = z.object({
  offset: z.number().int().nonnegative().optional(),
  limit: z.number().int().positive().optional(),
  gericht: z.nullish(z.guid()),
  sort: z
    .union([z.enum(sortOptions.map((s) => s.value)), z.literal("")])
    .optional(),
  search_text: z.nullish(z.string().trim()),
});

export type FetchVerfahrenOptions = z.infer<typeof fetchVerfahrenOptionsSchema>;

const ERROR_MESSAGE = "Die Verfahren konnten nicht abgerufen werden.";

export default async function fetchVerfahren(
  authData: AuthenticationResponse,
  options?: FetchVerfahrenOptions,
) {
  const bearerToken = await getBearerToken(authData);

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
    const errorBody = await response.text();
    console.error("Error response body:", errorBody);
    throw new Error(ERROR_MESSAGE, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}). Body: ${errorBody}`,
    });
  }

  const data = await response.json();

  try {
    return VerfahrenSchema.array().parse(data);
  } catch (error) {
    throw new Error(ERROR_MESSAGE, { cause: error });
  }
}
