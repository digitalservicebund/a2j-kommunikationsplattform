import { authorizeToken } from "../api/authorizeToken.server";
import { AuthenticationProvider } from "./auth.types";
import type { AuthenticationResponse } from "./oAuth.server";

/**
 * getBearerToken
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(
  authData: AuthenticationResponse,
): Promise<string> {
  if (
    authData.provider === AuthenticationProvider.DEMO ||
    authData.provider === AuthenticationProvider.DEVELOPMENT
  ) {
    return authData.authenticationTokens.accessToken;
  }

  const token = await authorizeToken(authData.authenticationTokens.accessToken);
  return token.access_token;
}
