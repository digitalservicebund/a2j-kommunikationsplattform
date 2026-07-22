import z from "zod";
import { serverConfig } from "~/config/config.server";
import { sortOptions } from "~/config/verfahren";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { buildSearchParams } from "~/utils/buildSearchParams";
import { apiRequest } from "./apiClient";
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

const errorMessage = "Verfahren could not be fetched.";

export default async function fetchVerfahren(
  authData: AuthenticationResponse,
  options?: FetchVerfahrenOptions,
) {
  const parsed = fetchVerfahrenOptionsSchema.parse(options ?? {});

  const url = new URL(`${serverConfig().KOMPLA_API_URL}/api/v1/verfahren`);
  // buildSearchParams returns a URLSearchParams-like map of strings
  const searchParams = buildSearchParams(parsed);

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return apiRequest({
    authData,
    fullUrl: url.toString(),
    schema: VerfahrenSchema.array(),
    errorMessage: errorMessage,
  });
}
