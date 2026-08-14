import { z } from "zod";
import { BeteiligungenRequestSchema } from "~/domains/verfahren/schemas/beteiligungenRequestSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

export type Verfahren = z.infer<typeof VerfahrenSchema>;

const errorMessage = "Verfahren could not be created.";

export const VerfahrenAendernRequestSchema = z.object({
  verfahrensgegenstand: z.string().min(1),
  kurzrubrum: z.string().nullable(),
  gericht_id: z.string(),
  beteiligungen: BeteiligungenRequestSchema,
});

type VerfahrenAendernRequestDTO = z.infer<typeof VerfahrenAendernRequestSchema>;

export default async function createVerfahren(
  authData: AuthenticationResponse,
  verfahren: VerfahrenAendernRequestDTO,
): Promise<z.infer<typeof VerfahrenSchema>> {
  const safeId = authData.authenticationTokens.idToken;

  if (!safeId) {
    throw new Error("No safeId is available");
  }

  return apiRequest({
    authData,
    path: "/api/v1/verfahren",
    method: "POST",
    body: { safe_id: safeId, verfahren },
    errorMessage,
  });
}
