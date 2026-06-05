import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

export default async function deleteDokument(
  authData: AuthenticationResponse,
  id: string,
  verfahrenId: string,
  einreichungId: string,
): Promise<void> {
  const bearerToken = await getBearerToken(authData);

  console.log("domains/verfahren::deleteDokument", authData);

  // Endpoint /api/v1/verfahren/{verfahren-id}/einreichungen/{einreichung-id}/dokumente/{id}
  const response = await fetch(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${verfahrenId}/einreichungen/${einreichungId}/dokumente/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Dokument konnte nicht gelöscht werden (${response.status} ${response.statusText}). Body: ${errorBody}`,
    );
  }

  const data = await response.json();

  console.log("domains/verfahren::deleteDokument:data", JSON.stringify(data));
}
