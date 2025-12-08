import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { serverConfig } from "~/config/config.server";
import { setSession } from "./session.server";

export interface AuthenticationContext {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
}

export interface AuthenticationResponse {
  authenticationContext: AuthenticationContext;
  sessionCookieHeader: string; // This is the Set-Cookie header that should be set in the response to the client
}

export enum AuthenticationProvider {
  BEA = "bea",
}

// BRAK IdP uses "Authorization Code" OAuth 2.0 flow
export const authenticator = new Authenticator<AuthenticationResponse>();

const oauth2Strategy = new OAuth2Strategy(
  {
    cookie: "oauth2",
    clientId: serverConfig().BRAK_IDP_OIDC_CLIENT_ID,
    clientSecret: serverConfig().BRAK_IDP_OIDC_CLIENT_SECRET,
    authorizationEndpoint: `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/auth`,
    tokenEndpoint: `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/token`,
    redirectURI: `${serverConfig().BRAK_IDP_OIDC_REDIRECT_URI}`,
    scopes: ["openid"], // as required by BRAK IdP
    codeChallengeMethod: CodeChallengeMethod.S256,
  },
  async ({ tokens, request }) => {
    const acessTokenExpiresInSeconds = tokens.accessTokenExpiresInSeconds();
    const accessToken = tokens.accessToken();
    const expiresAt = Date.now() + acessTokenExpiresInSeconds * 1000; // 300 seconds
    const refreshToken = tokens.refreshToken();

    console.log("Authenticated via BRAK IdP. accessToken is", accessToken);

    const sessionCookieHeader = await setSession({
      accessToken,
      expiresAt,
      refreshToken,
      request,
    });

    const response: AuthenticationResponse = {
      authenticationContext: {
        accessToken,
        expiresAt,
        refreshToken,
      },
      sessionCookieHeader,
    };

    return response;
  },
);

authenticator.use(oauth2Strategy, AuthenticationProvider.BEA);

export async function refreshAccessToken(
  request: Request,
  refreshToken: string,
): Promise<AuthenticationResponse> {
  console.log("refresh access token");

  const newTokens = await oauth2Strategy.refreshToken(refreshToken);
  const refreshedTokenData = {
    accessToken: newTokens.accessToken(),
    refreshToken: newTokens.hasRefreshToken()
      ? newTokens.refreshToken()
      : refreshToken,
    expiresAt: Date.now() + newTokens.accessTokenExpiresInSeconds() * 1000,
  };

  const sessionCookieHeader = await setSession({
    ...refreshedTokenData,
    request,
  });

  const response: AuthenticationResponse = {
    authenticationContext: {
      ...refreshedTokenData,
    },
    sessionCookieHeader,
  };

  return response;
}

export async function revokeAccessToken(token: string) {
  console.log("revoke access token", token);

  await oauth2Strategy.revokeToken(token);
}
