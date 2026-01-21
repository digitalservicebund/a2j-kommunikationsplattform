import z from "zod";
import { serverConfig } from "~/config/config.server";
import { CodeWertSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

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
    throw new Error(errorMessage, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
    });
  }

  const data = await response.json();

  try {
    return z.array(CodeWertSchema).parse(data);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
