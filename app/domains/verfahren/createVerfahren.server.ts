import z from "zod";
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

export default async function createVerfahren(
  authData: AuthenticationResponse,
): Promise<Verfahren> {
  const safeId = authData.authenticationTokens.idToken;

  if (!safeId) {
    throw new Error("No safeId is available");
  }

  const rawData = await apiRequest({
    authData,
    path: "/api/v1/verfahren",
    method: "POST",
    body: { safe_id: safeId },
    errorMessage,
  });

  // API observation: POST /verfahren returns an array [{...}] instead of a single object
  const singleObject = extractSingleObject<unknown>(rawData);
  return VerfahrenSchema.parse(singleObject);
}
