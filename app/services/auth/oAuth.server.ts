import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { serverConfig } from "~/config/config.server";
import { MagicLinkStrategy } from "./MagicLinkStrategy.server";
import { setAuthSession } from "./authSession.server";

import type {
  AuthenticationResponse,
  AuthenticationTokens,
} from "./auth.types";
export type { AuthenticationResponse, AuthenticationTokens };

export enum AuthenticationProvider {
  BEA = "bea",
  DEMO = "demo",
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

    console.log("OAuth2Strategy: authenticated via BRAK IdP");

    const sessionCookieHeader = await setAuthSession({
      accessToken,
      expiresAt,
      refreshToken,
      request,
    });

    const response: AuthenticationResponse = {
      authenticationTokens: {
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

const magicLinkStrategy = new MagicLinkStrategy(
  {
    idpIssuer: serverConfig().KOMPLA_DEMO_IDP_ISSUER,
    serviceClientId: serverConfig().KOMPLA_DEMO_SERVICE_CLIENT_ID,
    serviceClientSecret: serverConfig().KOMPLA_DEMO_SERVICE_CLIENT_SECRET,
    clientId: serverConfig().KOMPLA_DEMO_CLIENT_ID,
    redirectUri: serverConfig().KOMPLA_DEMO_REDIRECT_URI,
    username: serverConfig().KOMPLA_DEMO_USERNAME,
    email: serverConfig().KOMPLA_DEMO_EMAIL,
  },
  async ({ tokens, request }) => {
    console.log("MagicLinkStrategy: verify — creating session");
    const sessionCookieHeader = await setAuthSession({
      ...tokens,
      request,
      isDemo: true,
    });
    const response: AuthenticationResponse = {
      authenticationTokens: tokens,
      sessionCookieHeader,
    };
    return response;
  },
);

authenticator.use(magicLinkStrategy, AuthenticationProvider.DEMO);

export async function getDemoMagicLinkUrl(): Promise<string> {
  return magicLinkStrategy.getMagicLinkUrl();
}

export async function refreshDemoToken(
  request: Request,
  refreshToken: string,
): Promise<AuthenticationResponse> {
  const tokens = await magicLinkStrategy.refreshAccessToken(refreshToken);
  const sessionCookieHeader = await setAuthSession({
    ...tokens,
    request,
    isDemo: true,
  });
  return {
    authenticationTokens: tokens,
    sessionCookieHeader,
  };
}

export async function refreshAccessToken(
  request: Request,
  refreshToken: string,
): Promise<AuthenticationResponse> {
  let newTokens;

  try {
    console.log("refreshAccessToken: refreshing access token");
    newTokens = await oauth2Strategy.refreshToken(refreshToken);
  } catch (error) {
    console.error("Error while refreshing the access token:", error);
    throw new Error("Failed to refresh the access token");
  }

  const refreshedTokenData = {
    accessToken: newTokens.accessToken(),
    refreshToken: newTokens.hasRefreshToken()
      ? newTokens.refreshToken()
      : refreshToken,
    expiresAt: Date.now() + newTokens.accessTokenExpiresInSeconds() * 1000,
  };

  const sessionCookieHeader = await setAuthSession({
    ...refreshedTokenData,
    request,
  });

  const response: AuthenticationResponse = {
    authenticationTokens: {
      ...refreshedTokenData,
    },
    sessionCookieHeader,
  };

  return response;
}

export async function revokeAccessToken(token: string) {
  console.log("revoke access token");

  try {
    await oauth2Strategy.revokeToken(token);
  } catch (error) {
    console.error("revoke access token error:", error);
    return new Response("Could not revoke the access token", { status: 500 });
  }
}
