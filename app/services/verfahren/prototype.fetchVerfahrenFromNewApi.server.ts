import { serverConfig } from "~/config/config.server";
import { newSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "../auth/getBearerToken.server";

export async function fetchVerfahrenFromNewApi(request: Request) {
  const bearerToken = await getBearerToken(request);

  if (bearerToken) {
    console.log("apiAccessToken is present in user session");

    const offset = 0;
    const limit = 10;

    // test fetching data from /verfahren endpoint with Bearer token
    const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren?limit=${limit}&offset=${offset}`;
    const errorMessage =
      "Verfahren konnten von neuer API nicht abgerufen werden";

    try {
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

      try {
        return newSchema.parse(response);
      } catch (error) {
        throw new Error("schema parse error", { cause: error });
      }
    } catch (error) {
      throw new Error("fetch error - " + errorMessage, { cause: error });
    }
  } else {
    console.log("no bearerToken is available");
  }
}
