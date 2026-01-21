import z from "zod";
import { serverConfig } from "~/config/config.server";
import { sortOptions } from "~/config/verfahren";
import { VerfahrenSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { buildSearchParams } from "~/util/buildSearchParams";

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

  console.log("fetchVerfahren called with options:", options);
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
    return VerfahrenSchema.array().parse(data);
  } catch (error) {
    throw new Error(ERROR_MESSAGE, { cause: error });
  }
}
