import { authorizeToken } from "../api/authorizeToken.server";
import { getUserSession } from "./session.server";

/**
 * getBearerToken
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(request: Request): Promise<string> {
  console.log("getBearerToken");

  const userSession = await getUserSession(request);
  const accessToken = userSession.accessToken;
  const token = await authorizeToken(accessToken);
  return token.access_token;
}
