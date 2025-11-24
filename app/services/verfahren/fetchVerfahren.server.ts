import z from "zod";
import { serverConfig } from "~/config/config.server";
import { newVerfahrenSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "~/services/auth/getBearerToken.server";

type FetchVerfahrenOptions = {
  limit?: number;
  offset?: number;
};

const errorMessage = "Die Verfahren konnten nicht abgerufen werden.";

export default async function (
  request: Request,
  options?: FetchVerfahrenOptions,
) {
  const bearerToken = await getBearerToken(request);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const offset = options?.offset || 0;
  const limit = options?.limit || 10;

  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren?limit=${limit}&offset=${offset}`;

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
    return z.array(newVerfahrenSchema).parse(data);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
