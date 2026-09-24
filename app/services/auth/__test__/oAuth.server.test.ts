import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthenticationProvider } from "../auth.types";
import {
  exchangeForKomPlaIdpTokens,
  makeGetTokenFromBrakIdp,
  makeGetUserInfo,
} from "../oAuth.server";

const mocks = vi.hoisted(() => ({
  fetch: vi.fn(),
  Agent: vi.fn(),
}));

vi.mock("undici", () => ({
  fetch: mocks.fetch,
  Agent: mocks.Agent,
}));

vi.mock("~/config/config.server", () => ({
  serverConfig: () => ({
    BRAK_IDP_OIDC_ISSUER: "https://brak-idp.example",
    BRAK_IDP_OIDC_CLIENT_CERTIFICATE: "mock-cert-pem",
    BRAK_IDP_OIDC_CLIENT_CERTIFICATE_KEY: "mock-key-pem",
    KOMPLA_IDP_OIDC_CLIENT_ID: "kompla-client-id",
    KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT: "https://kompla-idp.example/token",
    KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER: "brak-subject-issuer",
  }),
}));

const tokenExchangeResponse = {
  access_token: "kompla-access-token",
  expires_in: 300,
  refresh_expires_in: 1800,
  refresh_token: "kompla-refresh-token",
  token_type: "Bearer",
  "not-before-policy": 0,
  session_state: "session-state",
  scope: "kompla-api",
  issued_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
};

/**
 * Stubs the global fetch (used for the token exchange, unlike Undici's fetch
 * used for the BRAK IdP) to respond with the given response.
 */
function stubTokenExchange(response: () => Response) {
  const globalFetch = vi.fn(async () => response());
  vi.stubGlobal("fetch", globalFetch);
  return vi.mocked(fetch);
}

function successfulTokenExchange() {
  return Response.json(tokenExchangeResponse);
}

function makeIdToken(claims: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none" })).toString(
    "base64url",
  );
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${header}.${payload}.sig`;
}

describe("makeGetUserInfo", () => {
  it("returns user info from the ID token", async () => {
    const idToken = makeIdToken({
      sub: "user-123",
      email: "user-123@example.com",
      name: "Voller Name",
      "safe-id": "DE.BRAK_SPT.abc-123",
    });

    const getUserInfo = makeGetUserInfo(AuthenticationProvider.BEA);
    const userInfo = await getUserInfo({ idToken });

    expect(userInfo).toEqual({
      sub: "user-123",
      email: "user-123@example.com",
      emailVerified: false,
      name: "Voller Name",
      "safe-id": "DE.BRAK_SPT.abc-123",
    });
  });

  it("synthesizes an email address if there is no 'email' claim", async () => {
    const idToken = makeIdToken({
      sub: "user-123",
      "safe-id": "DE.BRAK_SPT.abc-123",
    });

    const getUserInfo = makeGetUserInfo(AuthenticationProvider.BEA);
    const userInfo = await getUserInfo({ idToken });

    expect(userInfo).toMatchObject({
      email: "bea-DE.BRAK_SPT.abc-123@no-email.kompla-justiz.internal",
    });
  });

  it("falls back to the sub claim when safe-id is absent", async () => {
    const idToken = makeIdToken({ sub: "user-sub-456" });

    const getUserInfo = makeGetUserInfo(AuthenticationProvider.KOMPLA_IDP);
    const userInfo = await getUserInfo({ idToken });

    expect(userInfo).toBeDefined();
    expect(userInfo!.sub).toBe("user-sub-456");
    expect(userInfo!.email).toBe(
      "kompla-idp-user-sub-456@no-email.kompla-justiz.internal",
    );
  });

  it("returns null if there is no ID token", async () => {
    const getUserInfo = makeGetUserInfo(AuthenticationProvider.BEA);
    const userInfo = await getUserInfo({});

    expect(userInfo).toBeNull();
  });
});

describe("makeGetTokenFromBrakIdp", () => {
  const discoveryUrl =
    "https://brak-idp.example/.well-known/openid-configuration";
  const tokenEndpoint = "https://brak-idp.example/token";

  function jsonResponse(
    body: unknown,
    { ok = true, status = 200 } = {},
  ): Response {
    return {
      ok,
      status,
      json: vi.fn().mockResolvedValue(body),
      text: vi.fn().mockResolvedValue(JSON.stringify(body)),
    } as unknown as Response;
  }

  function makeTokenGetter() {
    return makeGetTokenFromBrakIdp({
      clientId: "client-id",
      clientSecret: "client-secret",
      scopes: ["openid"],
      redirectURI: "https://app.example/callback",
    });
  }

  beforeEach(() => {
    mocks.fetch.mockReset();
    mocks.Agent.mockReset();
    stubTokenExchange(successfulTokenExchange);
    mocks.fetch.mockImplementation(async (url: string) => {
      if (url === discoveryUrl) {
        return jsonResponse({ token_endpoint: tokenEndpoint });
      }
      if (url === tokenEndpoint) {
        return jsonResponse({
          access_token: "access-token",
          refresh_token: "refresh-token",
          id_token: "id-token",
          scope: "openid profile",
        });
      }
      throw new Error(`Unexpected fetch call to "${url}"`);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("exchanges the authorization code for tokens via the discovered token endpoint, presenting the client certificate", async () => {
    const getToken = makeTokenGetter();

    const result = await getToken({
      code: "auth-code",
      redirectURI: "https://app.example/betterauth/callback/should/be/ignored",
      codeVerifier: "code-verifier",
      deviceId: "device-id",
    });

    expect(result).toMatchObject({
      accessToken: "kompla-access-token",
      refreshToken: "kompla-refresh-token",
      idToken: "id-token",
    });

    expect(mocks.fetch).toHaveBeenNthCalledWith(1, discoveryUrl);

    expect(mocks.Agent).toHaveBeenCalledWith({
      connect: {
        cert: "mock-cert-pem",
        key: "mock-key-pem",
      },
    });
    const agentInstance = mocks.Agent.mock.results[0]?.value as unknown;

    expect(mocks.fetch).toHaveBeenNthCalledWith(
      2,
      tokenEndpoint,
      expect.objectContaining({
        method: "POST",
        dispatcher: agentInstance,
      }),
    );

    const [, requestInit] = mocks.fetch.mock.calls[1] as [
      string,
      { body: URLSearchParams },
    ];
    expect(requestInit.body.get("grant_type")).toBe("authorization_code");
    expect(requestInit.body.get("code")).toBe("auth-code");
    expect(requestInit.body.get("code_verifier")).toBe("code-verifier");
    expect(requestInit.body.get("device_id")).toBe("device-id");
    expect(requestInit.body.get("client_id")).toBe("client-id");
    expect(requestInit.body.get("client_secret")).toBe("client-secret");
    expect(requestInit.body.get("redirect_uri")).toBe(
      "https://app.example/callback",
    );
  });

  it("reuses the discovered token endpoint and mTLS agent across multiple calls", async () => {
    const getToken = makeTokenGetter();
    const tokenRequest = {
      code: "auth-code",
      redirectURI: "https://app.example/betterauth/callback/should/be/ignored",
    };

    await getToken(tokenRequest);
    await getToken(tokenRequest);

    // Discovery only happens once; both calls hit the cached token endpoint.
    const discoveryCalls = mocks.fetch.mock.calls.filter(
      ([url]) => url === discoveryUrl,
    );
    expect(discoveryCalls).toHaveLength(1);

    const tokenCalls = mocks.fetch.mock.calls.filter(
      ([url]) => url === tokenEndpoint,
    );
    expect(tokenCalls).toHaveLength(2);

    // The mTLS agent is only constructed once and then reused.
    expect(mocks.Agent).toHaveBeenCalledTimes(1);
  });

  it("re-runs discovery on the next call if it previously failed", async () => {
    const getToken = makeTokenGetter();
    const tokenRequest = {
      code: "auth-code",
      redirectURI: "https://app.example/betterauth/callback/should/be/ignored",
    };

    mocks.fetch.mockImplementationOnce(async () =>
      jsonResponse({}, { ok: false, status: 500 }),
    );

    await expect(getToken(tokenRequest)).rejects.toThrow(
      "Failed to resolve BRAK IdP token endpoint",
    );
    expect(mocks.fetch).toHaveBeenCalledTimes(1);

    const result = await getToken(tokenRequest);

    expect(result.accessToken).toBe("kompla-access-token");
    expect(mocks.fetch).toHaveBeenCalledTimes(3);
  });

  it("exchanges the BRAK access token for KomPla IdP tokens, keeping the BRAK ID token", async () => {
    const globalFetch = stubTokenExchange(successfulTokenExchange);
    const getToken = makeTokenGetter();

    const result = await getToken({
      code: "auth-code",
      redirectURI: "https://app.example/callback",
    });

    const [, requestInit] = globalFetch.mock.calls[0] as unknown as [
      string,
      { body: string },
    ];
    expect(new URLSearchParams(requestInit.body).get("subject_token")).toBe(
      "access-token",
    );
    expect(result).toMatchObject({
      accessToken: "kompla-access-token",
      refreshToken: "kompla-refresh-token",
      idToken: "id-token",
    });
  });

  it("throws if the token exchange fails", async () => {
    stubTokenExchange(() => new Response("Bad Request", { status: 400 }));
    const getToken = makeTokenGetter();

    await expect(
      getToken({
        code: "auth-code",
        redirectURI: "https://app.example/callback",
      }),
    ).rejects.toThrow("Token exchange failed");
  });

  it("throws if the discovery document has no token_endpoint", async () => {
    const getToken = makeTokenGetter();

    mocks.fetch.mockImplementationOnce(async () => jsonResponse({}));

    await expect(
      getToken({
        code: "auth-code",
        redirectURI:
          "https://app.example/betterauth/callback/should/be/ignored",
      }),
    ).rejects.toThrow("Failed to resolve BRAK IdP token endpoint");
  });

  it("computes accessTokenExpiresAt from the token response's expires_in", async () => {
    const getToken = makeTokenGetter();
    mocks.fetch.mockImplementation(async (url: string) => {
      if (url === discoveryUrl) {
        return jsonResponse({ token_endpoint: tokenEndpoint });
      }
      if (url === tokenEndpoint) {
        return jsonResponse({
          access_token: "access-token",
          refresh_token: "refresh-token",
          id_token: "id-token",
          expires_in: 60,
          scope: "openid profile",
        });
      }
      throw new Error(`Unexpected fetch call to "${url}"`);
    });

    const result = await getToken({
      code: "auth-code",
      redirectURI: "https://app.example/callback",
    });

    expect(result.accessTokenExpiresAt).toBeInstanceOf(Date);
  });

  it("throws if the token request fails", async () => {
    const getToken = makeTokenGetter();

    mocks.fetch.mockImplementation(async (url: string) => {
      if (url === discoveryUrl) {
        return jsonResponse({ token_endpoint: tokenEndpoint });
      }
      return jsonResponse(
        { error: "invalid_client" },
        { ok: false, status: 401 },
      );
    });

    await expect(
      getToken({
        code: "auth-code",
        redirectURI: "https://app.example/callback",
      }),
    ).rejects.toThrow("Token request failed with status 401");
  });
});

describe("exchangeForKomPlaIdpTokens", () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: new Date("2026-01-01T00:00:00Z") });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("exchanges the BRAK access token at the KomPla IdP (RFC 8693)", async () => {
    const globalFetch = stubTokenExchange(successfulTokenExchange);

    await exchangeForKomPlaIdpTokens("brak-access-token", "brak-id-token");

    expect(globalFetch).toHaveBeenCalledWith(
      "https://kompla-idp.example/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: expect.any(String),
      },
    );

    const [, requestInit] = globalFetch.mock.calls[0] as unknown as [
      string,
      { body: string },
    ];
    const requestBody = new URLSearchParams(requestInit.body);
    expect(requestBody.get("grant_type")).toBe(
      "urn:ietf:params:oauth:grant-type:token-exchange",
    );
    expect(requestBody.get("requested_token_type")).toBe(
      "urn:ietf:params:oauth:token-type:refresh_token",
    );
    expect(requestBody.get("client_id")).toBe("kompla-client-id");
    expect(requestBody.get("subject_issuer")).toBe("brak-subject-issuer");
    expect(requestBody.get("scope")).toBe("kompla-api");
    expect(requestBody.get("subject_token")).toBe("brak-access-token");
  });

  it("maps the response to Better Auth tokens, keeping the ID token from the login", async () => {
    stubTokenExchange(successfulTokenExchange);

    const result = await exchangeForKomPlaIdpTokens(
      "brak-access-token",
      "brak-id-token",
    );

    expect(result).toEqual({
      tokenType: "Bearer",
      accessToken: "kompla-access-token",
      refreshToken: "kompla-refresh-token",
      accessTokenExpiresAt: new Date("2026-01-01T00:05:00Z"),
      refreshTokenExpiresAt: new Date("2026-01-01T00:30:00Z"),
      scopes: ["kompla-api"],
      idToken: "brak-id-token",
      raw: tokenExchangeResponse,
    });
  });

  it("throws if the token exchange fails", async () => {
    stubTokenExchange(() => new Response("Bad Request", { status: 400 }));

    await expect(
      exchangeForKomPlaIdpTokens("brak-access-token", undefined),
    ).rejects.toThrow("Token exchange failed");
  });
});
