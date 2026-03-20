import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

// API observation: validation_messages is always an empty array even when status is ROT.
// This appears to be an API bug — validation fails but provides no error details.
export type EinreichungValidationStatus = {
  status: "GRUEN" | "GELB" | "ROT";
  validation_messages: string[];
};

export default async function getEinreichungStatus(
  authData: AuthenticationResponse,
  verfahrenId: string,
  einreichungId: string,
): Promise<EinreichungValidationStatus> {
  const bearerToken = await getBearerToken(authData);

  const response = await fetch(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${verfahrenId}/einreichungen/${einreichungId}/status`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Einreichungsstatus konnte nicht abgerufen werden (${response.status} ${response.statusText}). Body: ${errorBody}`,
    );
  }

  return response.json();
}
