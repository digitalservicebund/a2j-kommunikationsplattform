import z from "zod";
import { serverConfig } from "~/config/config.server";
import { sortOptions } from "~/config/verfahren";
import { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import {
  VerfahrenAendernRequestDTO,
  VerfahrenAendernRequestSchema,
} from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.request.schema";
import { VerfahrenSchema } from "~/domains/verfahren/infrastructure/schemas/verfahren.schema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { buildSearchParams } from "~/utils/buildSearchParams";

export { VerfahrenAendernRequestSchema };
export type { VerfahrenAendernRequestDTO };

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

export const fetchVerfahrenSchema = z.object({
  elemente: z.array(VerfahrenSchema),
});

export async function fetchVerfahren(
  authData: AuthenticationResponse,
  options?: FetchVerfahrenOptions,
): Promise<z.infer<typeof fetchVerfahrenSchema>> {
  const errorMessage = "Verfahren could not be fetched.";
  const { search_text, ...parsed } = fetchVerfahrenOptionsSchema.parse(
    options ?? {},
  );

  const url = new URL(`${serverConfig().KOMPLA_API_URL}/api/v1/verfahren`);
  // buildSearchParams returns a URLSearchParams-like map of strings
  // The API expects `suchbegriff` as the query parameter name.
  const searchParams = buildSearchParams({
    ...parsed,
    suchbegriff: search_text,
  });

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return apiRequest({
    authData,
    fullUrl: url.toString(),
    schema: fetchVerfahrenSchema,
    errorMessage,
  });
}

type FetchVerfahrenByIdOptions = {
  id: string;
};

export async function fetchVerfahrenById(
  authData: AuthenticationResponse,
  options: FetchVerfahrenByIdOptions,
): Promise<Verfahren> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.id}`,
    schema: VerfahrenSchema,
    errorMessage: `Verfahren with ${options.id} could not be fetched.`,
  });
}

export async function createVerfahren(
  authData: AuthenticationResponse,
  verfahren: VerfahrenAendernRequestDTO,
): Promise<Verfahren> {
  const errorMessage = "Verfahren could not be created.";
  const safeId = authData.authenticationTokens.idToken;

  if (!safeId) {
    throw new Error("No safeId is available");
  }

  return apiRequest({
    authData,
    path: "/api/v1/verfahren",
    method: "POST",
    body: { safe_id: safeId, verfahren },
    schema: VerfahrenSchema,
    errorMessage,
  });
}

export async function updateVerfahren(
  authData: AuthenticationResponse,
  id: string,
  verfahren: VerfahrenAendernRequestDTO,
): Promise<Verfahren> {
  const errorMessage = "Fehler beim Bearbeiten des Verfahrens.";

  // The API enforces optimistic concurrency via If-Match, so the current
  // eTag must be read immediately before the PUT.
  const { eTag } = await apiRequest<Verfahren>({
    authData,
    path: `/api/v1/verfahren/${id}`,
    schema: VerfahrenSchema,
    includeResponseETag: true,
    errorMessage,
  });

  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${id}`,
    method: "PUT",
    body: { ...verfahren },
    schema: VerfahrenSchema,
    eTag: eTag ?? undefined,
    errorMessage,
  });
}
