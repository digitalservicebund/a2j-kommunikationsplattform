import z from "zod";
import { serverConfig } from "~/config/config.server";
import { VerfahrenSchema } from "~/models/VerfahrenSchema";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

// API issue/bug: POST /verfahren returns an array [{...}] instead of a single object.
// We take the first element as a workaround.
export type Verfahren = z.infer<typeof VerfahrenSchema>;

export default async function createVerfahren(
  authData: AuthenticationResponse,
): Promise<Verfahren> {
  const bearerToken = await getBearerToken(authData);

  const response = await fetch(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Verfahren konnte nicht erstellt werden (${response.status} ${response.statusText}). Body: ${errorBody}`,
    );
  }

  const data = await response.json();
  const parsed = Array.isArray(data) ? data[0] : data;
  return VerfahrenSchema.parse(parsed);
}
