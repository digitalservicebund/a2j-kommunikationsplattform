import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
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
    const errorBody = await response.text();
    console.error("Gerichte error response body:", errorBody);
    throw new Error(errorMessage, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}). Body: ${errorBody}`,
    });
  }

  const data = await response.json();

  try {
    return GerichtSchema.array().parse(data);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
