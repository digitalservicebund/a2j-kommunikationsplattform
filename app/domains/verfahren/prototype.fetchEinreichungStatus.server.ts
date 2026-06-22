import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import {
  logApiErrorAndThrow,
  logParsingErrorAndThrow,
} from "~/utils/logApiError";
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
    await logApiErrorAndThrow(response, errorMessage);
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    const responseBody = await response.clone().text();
    logParsingErrorAndThrow(error, errorMessage, responseBody);
  }

  try {
    return StatusSchema.parse(data);
  } catch (error) {
    logParsingErrorAndThrow(error, errorMessage, JSON.stringify(data));
  }
}
