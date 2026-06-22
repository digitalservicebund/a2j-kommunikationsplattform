import z from "zod";
import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import {
  logApiErrorAndThrow,
  logParsingErrorAndThrow,
} from "~/utils/logApiError";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

// API issue/bug: POST /verfahren returns an array [{...}] instead of a single object.
// We take the first element as a workaround.
export type Verfahren = z.infer<typeof VerfahrenSchema>;

const errorMessage = "Verfahren konnte nicht erstellt werden.";

export default async function createVerfahren(
  authData: AuthenticationResponse,
): Promise<Verfahren> {
  const bearerToken = await getBearerToken(authData);
  const safeId = authData.authenticationTokens.idToken;

  const url = `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ safe_id: safeId }),
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

  const parsed = Array.isArray(data) ? data[0] : data;

  try {
    return VerfahrenSchema.parse(parsed);
  } catch (error) {
    logParsingErrorAndThrow(error, errorMessage, JSON.stringify(data));
  }
}
