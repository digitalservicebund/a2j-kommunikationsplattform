import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { serverConfig } from "~/config/config.server";
import { MagicLinkStrategy } from "./MagicLinkStrategy.server";
import { setAuthSession } from "./authSession.server";

import { LoginType } from "~/routes/action.login-user";
import { AuthenticationProvider, AuthenticationResponse } from "./auth.types";

type DecodedJWT = Record<string, unknown>;

// BRAK IdP uses "Authorization Code" OAuth 2.0 flow
export const authenticator = new Authenticator<AuthenticationResponse>();

let idToken = "";
let loginType: LoginType;

const beaOauth2Strategy = new OAuth2Strategy(
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
    const rawSafeId = tokens.idToken();
    const expiresAt = Date.now() + acessTokenExpiresInSeconds * 1000; // 300 seconds
    const refreshToken = tokens.refreshToken();

    const base64Url = rawSafeId.split(".")[1];
    const base64 = base64Url.replaceAll("-", "+").replaceAll("_", "/");
    const decodedIdToken = JSON.parse(atob(base64)) as DecodedJWT;
    idToken = decodedIdToken["safe-id"] as string;

    console.log("OAuth2Strategy: authenticated via BRAK IdP, safeId:", idToken);

    const sessionCookieHeader = await setAuthSession({
      accessToken,
      idToken,
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

    loginType = LoginType.BeA;

    return response;
  },
);

authenticator.use(beaOauth2Strategy, AuthenticationProvider.BEA);

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

    loginType = LoginType.Demo;
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

// KomPla IdP login uses "Authorization Code" OAuth 2.0 flow against the
// same Keycloak realm as the Demo IdP, via a dedicated confidential client.
// Keycloak renders its own hosted login page (username/password) — this app
// never sees the user's credentials. Used mainly for e2e and manual testing but, in the future, could be available to any user with KomPla IdP
// credentials

const komplaIdpOauth2Strategy = new OAuth2Strategy(
  {
    cookie: "oauth2-kompla-idp",
    clientId: serverConfig().KOMPLA_API_IDP_CLIENT_ID,
    clientSecret: serverConfig().KOMPLA_API_IDP_CLIENT_SECRET,
    // TODO: `KOMPLA_DEMO_IDP_ISSUER` is misleading here: this issuer is shared by both the Demo/Magic Link flow and the KomPla IdP login flow. In the next cleanup task, move shared KomPla IdP settings to neutral names (for example `KOMPLA_API_IDP_ISSUER`) and reserve `KOMPLA_DEMO_*` for demo-only values and `BRAK_*` for BRAK-specific values.
    authorizationEndpoint: `${serverConfig().KOMPLA_DEMO_IDP_ISSUER}/protocol/openid-connect/auth`,
    tokenEndpoint: `${serverConfig().KOMPLA_DEMO_IDP_ISSUER}/protocol/openid-connect/token`,
    redirectURI: `${serverConfig().KOMPLA_API_IDP_REDIRECT_URI}`,
    scopes: ["openid"],
    codeChallengeMethod: CodeChallengeMethod.S256,
  },
  async ({ tokens, request }) => {
    const accessToken = tokens.accessToken();
    const refreshToken = tokens.refreshToken();
    const expiresAt = Date.now() + tokens.accessTokenExpiresInSeconds() * 1000;

    console.log(
      "OAuth2Strategy: authenticated via KomPla IdP login, callback URL:",
      request.url,
    );

    const sessionCookieHeader = await setAuthSession({
      accessToken,
      expiresAt,
      refreshToken,
      request,
      provider: AuthenticationProvider.KOMPLA_IDP,
    });

    const response: AuthenticationResponse = {
      authenticationTokens: { accessToken, expiresAt, refreshToken },
      sessionCookieHeader,
      provider: AuthenticationProvider.KOMPLA_IDP,
    };

    loginType = LoginType.KomplaIdp;
    return response;
  },
);

authenticator.use(komplaIdpOauth2Strategy, AuthenticationProvider.KOMPLA_IDP);

export async function refreshKomplaIdpToken(
  request: Request,
  refreshToken: string,
): Promise<AuthenticationResponse> {
  console.log("refreshKomplaIdpToken: refreshing access token");
  const newTokens = await komplaIdpOauth2Strategy.refreshToken(refreshToken);

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
    provider: AuthenticationProvider.KOMPLA_IDP,
  });

  return {
    authenticationTokens: { ...refreshedTokenData },
    sessionCookieHeader,
    provider: AuthenticationProvider.KOMPLA_IDP,
  };
}

export async function refreshAccessToken(
  request: Request,
  refreshToken: string,
): Promise<AuthenticationResponse> {
  console.log("refreshAccessToken: refreshing access token");
  const newTokens = await beaOauth2Strategy.refreshToken(refreshToken);

  const refreshedTokenData = {
    accessToken: newTokens.accessToken(),
    idToken,
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

// TODO: Logout revocation isn't currently very secure and needs a fix:
// 1. Neither `beaOauth2Strategy` nor `komplaIdpOauth2Strategy` sets a
//    `tokenRevocationEndpoint`, so `strategy.revokeToken()` always throws
//    "Token revocation endpoint is not set." (see remix-auth-oauth2's
//    OAuth2Strategy.revokeToken). That error is caught here, logged, and
//    turned into a 500 Response that action.logout-user.ts never checks —
//    so no token is ever actually revoked at all, for either provider. This
//    failure is completely invisible: the browser still gets redirected to
//    /login as if logout succeeded, and the only trace is the
//    "revoke access token error:" console.error line in the server logs.
// 2. `loginType` is a module-level variable shared across all concurrent
//    requests/users, not derived from the logging-out user's own session.
//    Under concurrent logins, this can revoke the token with the wrong
//    provider's strategy, or match neither branch and skip revocation
//    entirely without any error. The provider should be read from the session
//    (`session.get("provider")` in action.logout-user.ts) and passed in
//    explicitly instead.
// 3. There is no case for `LoginType.Demo` — Demo/MagicLink tokens are
//    never revoked on logout at all.
// 4. This revokes the `accessToken`, but the `refreshToken` is what
//    actually needs revoking to make logout a real security boundary
//    (otherwise a leaked refresh token stays valid for its full lifetime
//    after logout, even though the session cookie is destroyed).
export async function revokeAccessToken(token: string) {
  try {
    if (loginType === LoginType.BeA) {
      console.log("revoke beA access token");
      await beaOauth2Strategy.revokeToken(token);
    }
    if (loginType === LoginType.KomplaIdp) {
      console.log("revoke kompla-idp-login access token");
      await komplaIdpOauth2Strategy.revokeToken(token);
    }
  } catch (error) {
    console.error("revoke access token error:", error);
    return new Response("Could not revoke the access token", { status: 500 });
  }
}
