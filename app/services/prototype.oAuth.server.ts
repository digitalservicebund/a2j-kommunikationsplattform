import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { serverConfig } from "~/config/config.server";
import { createUserSession } from "./prototype.session.server";

export interface AuthenticationContext {
  accessToken: string;
  expiresAt: number;
  demoMode: boolean;
}

export interface AuthenticationResponse {
  authenticationContext: AuthenticationContext;
  sessionCookieHeader: string; // This is the Set-Cookie header that should be set in the response to the client
}

export enum AuthenticationProvider {
  BEA = "bea",
}

export const authenticator = new Authenticator<AuthenticationResponse>();

authenticator.use(
  new OAuth2Strategy(
    {
      cookie: "oauth2",
      clientId: serverConfig().BRAK_IDP_OIDC_CLIENT_ID,
      clientSecret: serverConfig().BRAK_IDP_OIDC_CLIENT_SECRET,
      authorizationEndpoint: `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/auth`,
      tokenEndpoint: `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/token`,
      redirectURI: `${serverConfig().BRAK_IDP_OIDC_REDIRECT_URI}`,
      // scopes: ["openid", "safeid"], // is optional,
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async ({ tokens, request }) => {
      const accessToken = tokens.accessToken();
      const expiresAt = Date.now() + 60 * 60 * 1000 * 24 * 14; // 14 days
      const sessionCookieHeader = await createUserSession(
        accessToken,
        expiresAt,
        request,
      );

      const response: AuthenticationResponse = {
        authenticationContext: {
          accessToken,
          expiresAt,
          demoMode: false,
        },
        sessionCookieHeader,
      };

      return response;
    },
  ),
  AuthenticationProvider.BEA,
);
