import { AuthenticationProvider, AuthenticationResponse } from "./auth.types";
import { authorizeToken } from "./authorizeToken.server";

export async function getBearerToken(
  authData: AuthenticationResponse,
): Promise<string> {
  const isProviderBea = authData.provider === AuthenticationProvider.BEA;
  if (!isProviderBea) {
    return authData.authenticationTokens.accessToken;
  }

  const token = await authorizeToken(authData.authenticationTokens.accessToken);
  return token.access_token;
}
