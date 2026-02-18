import z from "zod";
import { serverConfig } from "~/config/config.server";
import { CodeWertSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "~/services/auth/getBearerToken.server";

const errorMessage =
  "Die Daten für das ausgewählte Gericht konnten nicht abgerufen werden.";

export default async function fetchGerichte(request: Request) {
  const bearerToken = await getBearerToken(request);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/gerichte`;

  console.log("Fetching Gerichte from URL:", url);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  console.log("Gerichte response status:", response.status);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gerichte error response body:", errorBody);
    throw new Error(errorMessage, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}). Body: ${errorBody}`,
    });
  }

  const data = await response.json();

  try {
    return z.array(CodeWertSchema).parse(data);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
