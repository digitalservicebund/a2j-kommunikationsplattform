import { authorizeToken } from "../api/authorizeToken.server";
import { AuthenticationProvider, AuthenticationResponse } from "./auth.types";

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
    authData.provider === AuthenticationProvider.DEVELOPMENT ||
    authData.provider === AuthenticationProvider.TEST
  ) {
    return authData.authenticationTokens.accessToken;
  }

  const token = await authorizeToken(authData.authenticationTokens.accessToken);
  return token.access_token;
}
