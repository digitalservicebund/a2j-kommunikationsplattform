import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

// API observation: `erstellt_von` is always an empty string — not populated from token claims.
export type Einreichung = {
  id: string;
  verfahren_id: string;
  status: "ENTWURF" | "EINGEREICHT";
  erstellt_am: string;
  erstellt_von: string;
};

export default async function createEinreichung(
  authData: AuthenticationResponse,
  verfahrenId: string,
) {
  const bearerToken = await getBearerToken(authData);

  const response = await fetch(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${verfahrenId}/einreichungen`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Einreichung konnte nicht erstellt werden (${response.status} ${response.statusText}). Body: ${errorBody}`,
    );
  }

  return response.json() as Promise<Einreichung>;
}
