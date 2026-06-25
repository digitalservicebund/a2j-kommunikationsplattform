import { serverConfig } from "~/config/config.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import {
  logApiErrorAndThrow,
  logParsingErrorAndThrow,
} from "~/utils/logApiError";
import { GerichtSchema } from "./schemas/gerichtSchema";

const errorMessage =
  "Die Daten für das ausgewählte Gericht konnten nicht abgerufen werden.";

export default async function fetchGerichte(authData: AuthenticationResponse) {
  const bearerToken = await getBearerToken(authData);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/gerichte`;

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
    return GerichtSchema.array().parse(data);
  } catch (error) {
    logParsingErrorAndThrow(error, errorMessage, JSON.stringify(data));
  }
}
