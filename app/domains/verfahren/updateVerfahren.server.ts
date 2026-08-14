import { z } from "zod";
import { VerfahrenAendernRequestSchema } from "~/domains/verfahren/createVerfahren.server";
import { VerfahrenSchema } from "~/domains/verfahren/schemas/verfahrenSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Fehler beim Bearbeiten des Verfahrens.";

type UpdateVerfahrenDTO = z.infer<typeof VerfahrenAendernRequestSchema>;

export default async function updateVerfahren(
  authData: AuthenticationResponse,
  id: string,
  verfahren: UpdateVerfahrenDTO,
): Promise<z.infer<typeof VerfahrenSchema>> {
  // The API enforces optimistic concurrency via If-Match, so the current
  // eTag must be read immediately before the PUT.
  const { eTag } = await apiRequest<z.infer<typeof VerfahrenSchema>>({
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
    eTag: eTag ?? undefined,
    errorMessage,
  });
}
