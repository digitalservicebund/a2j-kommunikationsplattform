import z from "zod";
import { serverConfig } from "~/config/config.server";
import VerfahrenSchema, { newSchema } from "~/models/VerfahrenSchema";
import { fetchFromApi } from "../api/fetchFromApi.server";
import { exchangeToken } from "../api/tokenExchange.server";
import { getUserSession } from "../auth/session.server";

type FetchVerfahrenOptions = {
  limit?: number;
  offset?: number;
};

const errorMessage = "Die Verfahren konnten nicht abgerufen werden.";

export default async function (options?: FetchVerfahrenOptions) {
  const offset = options?.offset || 0;
  const limit = options?.limit || 10;
  const url = `/verfahren?limit=${limit}&offset=${offset}`;

  const response = await fetchFromApi({
    url,
    errorMessage,
  });

  try {
    return z.object({ verfahren: z.array(VerfahrenSchema) }).parse(response)
      .verfahren;
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}

// @TODO: clean up
// const testData = [
//   {
//     id: "0199cd30-ac46-768f-b695-5a75b21b64af",
//     aktenzeichenGericht: null,
//     status: "Erstellt",
//     statusChanged: "2025-10-10T08:15:43.116718Z",
//     eingereichtAm: null,
//     gericht: null,
//     beteiligungen: [],
//   },
//   {
//     id: "0199dc44-cc85-7ac0-bc4a-fb685ed41f34",
//     aktenzeichenGericht: null,
//     status: "Erstellt",
//     statusChanged: "2025-10-13T06:32:00.3193Z",
//     eingereichtAm: null,
//     gericht: null,
//     beteiligungen: [],
//   },
// ];

export async function fetchFromNewApi(request: Request) {
  const userSession = await getUserSession(request);
  const accessToken = userSession?.accessToken;

  let apiAccessToken;
  if (accessToken) {
    console.log("accessToken is present in user session");

    apiAccessToken = await exchangeToken({
      idpAccessToken: accessToken,
    });

    // do a fetch test with Bearer token
    const url = `${serverConfig().KOMPLA_API_URL}/api/v1/v1/verfahren`;
    const errorMessage = "Verfahren konnten nicht abgerufen werden";
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiAccessToken}`,
        },
      });

      if (!response.ok) {
        // 4xx and 5xx errors
        throw new Error(errorMessage, {
          cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
        });
      }

      try {
        return z.object({ verfahren: z.array(newSchema) }).parse(response)
          .verfahren;
      } catch (error) {
        throw new Error(errorMessage, { cause: error });
      }
    } catch (error) {
      // network errors
      throw new Error(errorMessage, { cause: error });
    }
  } else {
    console.log("no accessToken in user session");
  }
}
