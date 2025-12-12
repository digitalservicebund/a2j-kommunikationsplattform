import { authorizeToken } from "../api/authorizeToken.server";
import { getUserSession } from "./session.server";

/**
 * getBearerToken
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(request: Request): Promise<string> {
  console.log("getBearerToken", request);

  const userSession = await getUserSession(request);
  console.log("userSession", userSession);
  const accessToken = userSession.authenticationTokens.accessToken;
  console.log("accessToken", accessToken);
  const token = await authorizeToken(accessToken);
  return token.access_token;
}
