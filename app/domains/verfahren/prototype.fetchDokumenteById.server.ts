import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import {
  logApiErrorAndThrow,
  logParsingErrorAndThrow,
} from "~/utils/logApiError";
import { DokumenteSchema } from "./schemas/dokumentSchema";

type FetchDokumenteByIdOptions = {
  id: string;
  verfahrenId: string;
};

const errorMessage = (id: string) =>
  "Die Dokumente für die Einreichung mit der ID " +
  id +
  " konnten nicht abgerufen werden.";

export default async function fetchDokumenteById(
  authData: AuthenticationResponse,
  options: FetchDokumenteByIdOptions,
) {
  const bearerToken = await getBearerToken(authData);
  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/dokumente`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    await logApiErrorAndThrow(response, errorMessage(options.id));
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    const responseBody = await response.clone().text();
    logParsingErrorAndThrow(error, errorMessage(options.id), responseBody);
  }

  try {
    return DokumenteSchema.parse(data);
  } catch (error) {
    logParsingErrorAndThrow(
      error,
      errorMessage(options.id),
      JSON.stringify(data),
    );
  }
}
