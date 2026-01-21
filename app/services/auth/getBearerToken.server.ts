import { authorizeToken } from "../api/authorizeToken.server";
import type { AuthenticationResponse } from "./oAuth.server";

/**
 * getBearerToken
 *
 * Uses auth data from middleware context instead of re-fetching from session.
 * This prevents double token refresh attempts when the token no,
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(
  authData: AuthenticationResponse,
): Promise<string> {
  console.log("getBearerToken");

  const accessToken = authData.authenticationTokens.accessToken;
  const token = await authorizeToken(accessToken);
  return token.access_token;
}
