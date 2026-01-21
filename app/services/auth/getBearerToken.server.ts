import { authorizeToken } from "../api/authorizeToken.server";
import { getAuthData } from "./authSession.server";

/**
 * getBearerToken
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(request: Request): Promise<string> {
  console.log("getBearerToken");

  const authData = await getAuthData(request);

  if (!authData) {
    throw new Error("No auth data available");
  }

  const accessToken = authData.authenticationTokens.accessToken;
  const token = await authorizeToken(accessToken);
  return token.access_token;
}
