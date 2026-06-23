import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { serverConfig } from "~/config/config.server";
import { MagicLinkStrategy } from "./MagicLinkStrategy.server";
import { setAuthSession } from "./authSession.server";

import {
  AuthenticationProvider,
  type AuthenticationResponse,
  type AuthenticationTokens,
} from "./auth.types";
export { AuthenticationProvider };
export type { AuthenticationResponse, AuthenticationTokens };

type DecodedJWT = Record<string, unknown>;

// BRAK IdP uses "Authorization Code" OAuth 2.0 flow
export const authenticator = new Authenticator<AuthenticationResponse>();

const clientId = serverConfig().BRAK_IDP_OIDC_CLIENT_ID;
const clientSecret = serverConfig().BRAK_IDP_OIDC_CLIENT_SECRET;
const authorizationEndpoint = `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/auth`;
const tokenEndpoint = `${serverConfig().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/token`;
const redirectURI = `${serverConfig().BRAK_IDP_OIDC_REDIRECT_URI}`;

console.log(
  `\nInit OAuth2Strategy with\nid ${clientId.slice(2, 4)}\nsecret ${clientSecret.slice(0, 4)}\nauth endpoint ${authorizationEndpoint}\ntoken endpoint ${tokenEndpoint} and\nredirect URI ${redirectURI}\n\n`,
);

const oauth2Strategy = new OAuth2Strategy(
  {
    cookie: "oauth2",
    clientId: clientId,
    clientSecret: clientSecret,
    authorizationEndpoint: authorizationEndpoint,
    tokenEndpoint: tokenEndpoint,
    redirectURI: redirectURI,
    scopes: ["openid"], // as required by BRAK IdP
    codeChallengeMethod: CodeChallengeMethod.S256,
  },
  async ({ tokens, request }) => {
    const acessTokenExpiresInSeconds = tokens.accessTokenExpiresInSeconds();
    const accessToken = tokens.accessToken();
    const idToken = tokens.idToken();
    const expiresAt = Date.now() + acessTokenExpiresInSeconds * 1000; // 300 seconds
    const refreshToken = tokens.refreshToken();

    const base64Url = idToken.split(".")[1];
    const base64 = base64Url.replaceAll("-", "+").replaceAll("_", "/");
    const decodedIdToken = JSON.parse(atob(base64)) as DecodedJWT;
    const safeId = decodedIdToken["safe-id"] as string;

    console.log("OAuth2Strategy: authenticated via BRAK IdP, safeId:", safeId);

    const sessionCookieHeader = await setAuthSession({
      accessToken,
      idToken: safeId,
      expiresAt,
      refreshToken,
      request,
      provider: AuthenticationProvider.BEA,
    });

    const response: AuthenticationResponse = {
      authenticationTokens: {
        accessToken,
        idToken,
        expiresAt,
        refreshToken,
      },
      sessionCookieHeader,
      provider: AuthenticationProvider.BEA,
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
      provider: AuthenticationProvider.DEMO,
    });
    const response: AuthenticationResponse = {
      authenticationTokens: tokens,
      sessionCookieHeader,
      provider: AuthenticationProvider.DEMO,
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
    provider: AuthenticationProvider.DEMO,
  });
  return {
    authenticationTokens: tokens,
    sessionCookieHeader,
    provider: AuthenticationProvider.DEMO,
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
    provider: AuthenticationProvider.BEA,
  });

  const response: AuthenticationResponse = {
    authenticationTokens: {
      ...refreshedTokenData,
    },
    sessionCookieHeader,
    provider: AuthenticationProvider.BEA,
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
