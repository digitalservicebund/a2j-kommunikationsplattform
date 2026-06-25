import z from "zod";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { apiRequest } from "./apiClient";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

// API issue/bug: POST /verfahren returns an array [{...}] instead of a single object.
// We take the first element as a workaround.
export type Verfahren = z.infer<typeof VerfahrenSchema>;

const errorMessage = "Verfahren konnte nicht erstellt werden.";

// This can be removed and adjusted as soon as API v3.0.4 has been released,
// align with SINC and API REST guidelines on this
function extractSingleObject<T>(data: unknown): T {
  return (Array.isArray(data) ? data[0] : data) as T;
}

export default async function createVerfahren(
  authData: AuthenticationResponse,
): Promise<Verfahren> {
  const safeId = authData.authenticationTokens.idToken;

  const rawData = await apiRequest({
    authData,
    path: "/api/v1/verfahren",
    method: "POST",
    body: { safe_id: safeId },
    errorMessage,
  });

  // API observation: POST /dokumente returns an array [{...}] instead of a single object
  const singleObject = extractSingleObject<unknown>(rawData);
  return VerfahrenSchema.parse(singleObject);
}
