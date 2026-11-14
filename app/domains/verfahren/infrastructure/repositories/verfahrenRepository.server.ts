import z from "zod";
import { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import { VerfahrenAendernRequestDTO } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.request.schema";
import { VerfahrenSchema } from "~/domains/verfahren/infrastructure/schemas/verfahren.schema";
import {
  SORT_VALUES,
  toSortQueryValue,
} from "~/domains/verfahren/services/verfahrenListOptions";
import { AuthSession } from "~/services/auth/auth.types";

export const FetchVerfahrenOptionsSchema = z.object({
  offset: z.nullish(z.number().int().nonnegative()),
  limit: z.nullish(z.number().int().positive()),
  gericht: z.nullish(z.guid()),
  sort: z.nullish(z.union([z.enum(SORT_VALUES), z.literal("")])),
  suchbegriff: z.nullish(z.string().trim()),
});

export type FetchVerfahrenOptions = z.infer<typeof FetchVerfahrenOptionsSchema>;

export const fetchVerfahrenSchema = z.object({
  elemente: z.array(VerfahrenSchema),
});

export async function fetchVerfahren(
  authSession: AuthSession,
  options?: FetchVerfahrenOptions,
): Promise<z.infer<typeof fetchVerfahrenSchema>> {
  const { sort, ...parsedOptions } = FetchVerfahrenOptionsSchema.parse(
    options ?? {},
  );

  return apiRequest({
    authSession,
    path: "/api/v1/verfahren",
    searchParams: {
      ...parsedOptions,
      // Convert field names in `sort` to snake case (e.g. "eingereicht_am")
      sort: sort ? toSortQueryValue(sort) : sort,
    },
    schema: fetchVerfahrenSchema,
    errorMessage: "Verfahren could not be fetched.",
  });
}

type FetchVerfahrenByIdOptions = {
  id: string;
};

export async function fetchVerfahrenById(
  authSession: AuthSession,
  options: FetchVerfahrenByIdOptions,
): Promise<Verfahren> {
  return apiRequest({
    authSession,
    path: `/api/v1/verfahren/${options.id}`,
    schema: VerfahrenSchema,
    errorMessage: `Verfahren with ${options.id} could not be fetched.`,
  });
}

export async function createVerfahren(
  authSession: AuthSession,
  verfahren?: VerfahrenAendernRequestDTO,
): Promise<Verfahren> {
  const errorMessage = "Verfahren could not be created.";
  const safeId = authSession.safeId;

  if (!safeId) {
    throw new Error("No safeId is available");
  }

  return apiRequest({
    authSession,
    path: "/api/v1/verfahren",
    method: "POST",
    body: { safe_id: safeId, verfahren },
    schema: VerfahrenSchema,
    errorMessage,
  });
}

export async function updateVerfahren(
  authSession: AuthSession,
  id: string,
  verfahren: VerfahrenAendernRequestDTO,
): Promise<Verfahren> {
  const errorMessage = "Fehler beim Bearbeiten des Verfahrens.";

  // The API enforces optimistic concurrency via If-Match, so the current
  // eTag must be read immediately before the PUT.
  const { eTag } = await apiRequest<Verfahren>({
    authSession,
    path: `/api/v1/verfahren/${id}`,
    schema: VerfahrenSchema,
    includeResponseETag: true,
    errorMessage,
  });

  return apiRequest({
    authSession,
    path: `/api/v1/verfahren/${id}`,
    method: "PUT",
    body: { ...verfahren },
    schema: VerfahrenSchema,
    eTag: eTag ?? undefined,
    errorMessage,
  });
}

/**
 * Deletes the Verfahren together with its Einreichungen and Dokumente. Only
 * possible while it hasn't been submitted (the API responds with 409
 * otherwise).
 */
export async function deleteVerfahren(
  authSession: AuthSession,
  id: string,
): Promise<void> {
  const errorMessage = `Verfahren with id ${id} could not be deleted.`;

  const { eTag } = await apiRequest<Verfahren>({
    authSession,
    path: `/api/v1/verfahren/${id}`,
    schema: VerfahrenSchema,
    includeResponseETag: true,
    errorMessage,
  });

  await apiRequest({
    authSession,
    path: `/api/v1/verfahren/${id}`,
    method: "DELETE",
    eTag: eTag ?? undefined,
    errorMessage,
  });
}
