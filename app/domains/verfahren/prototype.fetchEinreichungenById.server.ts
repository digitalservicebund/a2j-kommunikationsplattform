import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { EinreichungenSchema } from "./schemas/einreichungSchema";

type fetchEinreichungenByIdOptions = {
  id: string;
};

const errorMessage = (id: string) =>
  "Die Einreichungen für das Verfahren mit der ID " +
  id +
  " konnten nicht abgerufen werden.";

export default async function fetchEinreichungenById(
  authData: AuthenticationResponse,
  options: fetchEinreichungenByIdOptions,
) {
  const bearerToken = await getBearerToken(authData);
  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.id}/einreichungen`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(errorMessage(options.id), {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
    });
  }

  const data = await response.json();

  try {
    return EinreichungenSchema.parse(data);
  } catch (error) {
    throw new Error(errorMessage(options.id), { cause: error });
  }
}
