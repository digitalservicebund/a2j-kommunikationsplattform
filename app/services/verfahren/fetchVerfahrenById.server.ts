import { serverConfig } from "~/config/config.server";
import { VerfahrenSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "~/services/auth/getBearerToken.server";

type FetchVerfahrenByIdOptions = {
  id: string;
};

const errorMessage = "Das Verfahren konnte nicht abgerufen werden.";

export default async function fetchVerfahrenById(
  request: Request,
  options: FetchVerfahrenByIdOptions,
) {
  const bearerToken = await getBearerToken(request);
  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.id}`;

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
    return VerfahrenSchema.parse(data);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
