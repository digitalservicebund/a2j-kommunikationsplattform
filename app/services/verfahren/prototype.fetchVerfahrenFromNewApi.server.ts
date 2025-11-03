import z from "zod";
import { serverConfig } from "~/config/config.server";
import { newSchema } from "~/models/VerfahrenSchema";
import { exchangeToken } from "../api/tokenExchange.server";
import { getUserSession } from "../auth/session.server";

export async function fetchVerfahrenFromNewApi(request: Request) {
  const userSession = await getUserSession(request);
  const accessToken = userSession?.accessToken;

  let apiAccessToken;
  if (accessToken) {
    console.log("accessToken is present in user session");

    apiAccessToken = await exchangeToken({
      idpAccessToken: accessToken,
    });

    const offset = 0;
    const limit = 10;

    // test fetching data from /verfahren endpoint with Bearer token
    const url = `${serverConfig().KOMPLA_API_URL}/api/v1/v1/verfahren?limit=${limit}&offset=${offset}`;
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
