import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { logApiErrorAndThrow } from "~/utils/logApiError";

// API observation: `erstellt_von` is always an empty string — not populated from tokens
export type Einreichung = {
  id: string;
  verfahren_id: string;
  status: "ENTWURF" | "EINGEREICHT";
  erstellt_am: string;
  erstellt_von: string;
};

const errorMessage = "Einreichung konnte nicht erstellt werden.";

export default async function createEinreichung(
  authData: AuthenticationResponse,
  verfahrenId: string,
) {
  const bearerToken = await getBearerToken(authData);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${verfahrenId}/einreichungen`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Klageeinreichung" }),
  });

  if (!response.ok) {
    await logApiErrorAndThrow(response, errorMessage);
  }

  return response.json() as Promise<Einreichung>;
}
