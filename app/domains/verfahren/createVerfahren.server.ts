import { z } from "zod";
import { BeteiligungenSchema } from "~/domains/verfahren/schemas/beteiligungenSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

export type Verfahren = z.infer<typeof VerfahrenSchema>;

const errorMessage = "Verfahren could not be created.";

// This can be removed and adjusted as soon as API v3.0.4 has been released,
// align with SINC and API REST guidelines on this
function extractSingleObject<T>(data: unknown): T {
  return (Array.isArray(data) ? data[0] : data) as T;
}

export const VerfahrenAendernRequestSchema = z.object({
  verfahrensgegenstand: z.string().min(1),
  kurzrubrum: z.string().nullable(),
  gericht_id: z.string(),
  beteiligungen: BeteiligungenSchema,
});

type VerfahrenAendernRequestDTO = z.infer<typeof VerfahrenAendernRequestSchema>;

export default async function createVerfahren(
  authData: AuthenticationResponse,
  verfahren: VerfahrenAendernRequestDTO,
): Promise<Verfahren> {
  const safeId = authData.authenticationTokens.idToken;

  if (!safeId) {
    throw new Error("No safeId is available");
  }

  const rawData = await apiRequest({
    authData,
    path: "/api/v1/verfahren",
    method: "POST",
    body: { safe_id: safeId, verfahren },
    errorMessage,
  });

  // API observation: POST /verfahren returns an array [{...}] instead of a single object
  const singleObject = extractSingleObject<unknown>(rawData);
  return VerfahrenSchema.parse(singleObject);
}
