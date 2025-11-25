import { serverConfig } from "~/config/config.server";
import { newVerfahrenSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "~/services/auth/getBearerToken.server";

type FetchVerfahrenByIdOptions = {
  id: string;
};

const errorMessage = "Das Verfahren konnte nicht abgerufen werden.";

export default async function (
  request: Request,
  options: FetchVerfahrenByIdOptions,
) {
  const bearerToken = await getBearerToken(request);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  console.log("Fetch Verfahren by ID response status:", response);

  if (!response.ok) {
    throw new Error(errorMessage, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
    });
  }

  const data = await response.json();
  console.log("Fetch Verfahren by ID response data:", data);

  try {
    return newVerfahrenSchema.parse(data);
  } catch (error) {
    console.log("Error parsing Verfahren by ID data:", error);
    throw new Error(errorMessage, { cause: error });
  }
}
