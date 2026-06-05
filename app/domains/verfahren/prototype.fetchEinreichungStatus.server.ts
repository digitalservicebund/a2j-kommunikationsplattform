import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { StatusSchema } from "./schemas/statusSchema";

type FetchEinreichungStatusOptions = {
  id: string;
  verfahrenId: string;
};

const errorMessage =
  "Der Validierungsstatus der Einreichung konnte nicht abgerufen werden.";

export default async function fetchEinreichungStatus(
  authData: AuthenticationResponse,
  options: FetchEinreichungStatusOptions,
) {
  const bearerToken = await getBearerToken(authData);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  console.log(
    "fetchEinreichungStatus for",
    options.id,
    "in Verfahren",
    options.verfahrenId,
  );

  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/validierungsstatus`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(errorMessage, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
    });
  }

  const data = await response.json();

  try {
    return StatusSchema.parse(data);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
