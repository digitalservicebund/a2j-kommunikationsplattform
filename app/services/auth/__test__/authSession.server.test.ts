/* eslint-disable  @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from "vitest";

const MODULE_PATH = "../authSession.server";
const requestURL = "http://localhost/session-test";

async function withMocks({
  env = "development",
  serverSecret = "server-secret-123",
  nodeEnv = "test",
  refreshResponse = null,
}: {
  env?: string;
  serverSecret?: string;
  nodeEnv?: string;
  refreshResponse?: {
    authenticationTokens: {
      accessToken: string;
      expiresAt: number;
      refreshToken: string;
    };
    sessionCookieHeader: string;
  } | null;
} = {}) {
  vi.resetModules();

  vi.doMock("~/config/config", () => ({
    config: () => ({ ENVIRONMENT: env }),
  }));

  vi.doMock("~/config/config.server", () => ({
    serverConfig: () => ({ BRAK_IDP_OIDC_CLIENT_SECRET: serverSecret }),
  }));

  const prevNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = nodeEnv;

  const parseCookie = (cookieStr: any) => {
    const out: Record<string, string> = {};
    if (!cookieStr) return out;
    cookieStr.split(";").forEach((part: any) => {
      const [k, v] = part.split("=").map((s: any) => s.trim());
      if (k) out[k] = v ?? "";
    });
    return out;
  };

  const reactRouterMock = {
    lastOptions: null as CookieSessionStorageOptions | null,
    getSession: vi.fn(async (cookieStr) => {
      const store = new Map<string, string | number>(
        Object.entries(parseCookie(cookieStr)),
      );
      if (store.has("expiresAt")) {
        const raw = store.get("expiresAt");
        const num = Number(raw);
        store.set("expiresAt", Number.isNaN(num) ? (raw ?? "") : num);
      }
      return {
        get: (k: string) => store.get(k),
        set: (k: string, v: string | number) => store.set(k, v),
      } as const;
    }),
    commitSession: vi.fn(async () => "mock-set-cookie=1"),
    destroySession: vi.fn(async () => {}),
  };

  interface SessionStore {
    get: (key: string) => string | number | undefined;
    set: (key: string, value: string | number) => void;
  }

  interface CookieSessionStorageOptions {
    cookie: {
      name: string;
      sameSite: string;
      path: string;
      httpOnly: boolean;
      secure: boolean;
      secrets: string[];
    };
  }

  interface CookieSessionStorage {
    getSession: (cookieStr: string | null) => Promise<SessionStore>;
    commitSession: () => Promise<string>;
    destroySession: () => Promise<void>;
  }

  const redirectError = (url: string, init?: ResponseInit) => {
    const error = new Error(`redirect to ${url}`) as any;
    error.status = 302;
    error.location = url;
    error.init = init;
    return error;
  };

  vi.doMock("react-router", () => ({
    createCookieSessionStorage: (
      options: CookieSessionStorageOptions,
    ): CookieSessionStorage => {
      reactRouterMock.lastOptions = options;
      return {
        getSession: reactRouterMock.getSession,
        commitSession: reactRouterMock.commitSession,
        destroySession: reactRouterMock.destroySession,
      };
    },
    redirect: vi.fn((url: string, init?: ResponseInit) =>
      redirectError(url, init),
    ),
  }));

  // mock oAuth helpers used by authSession.server
  const refreshAccessTokenMock = vi.fn(async () => refreshResponse);
  const revokeAccessTokenMock = vi.fn(async () => undefined);
  // mock the oAuth helpers relative to this test file's location
  vi.doMock("../oAuth.server", () => ({
    refreshAccessToken: refreshAccessTokenMock,
    revokeAccessToken: revokeAccessTokenMock,
  }));

  const mod = await import(MODULE_PATH);

  return {
    module: mod,
    reactRouterMock,
    mocks: { refreshAccessTokenMock, revokeAccessTokenMock },
    restore: () => {
      process.env.NODE_ENV = prevNodeEnv;
      vi.clearAllMocks();
    },
  };
}

const futureTs = () => Date.now() + 60_000;
const pastTs = () => Date.now() - 60_000;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("authSession.server", () => {
  it("uses default secret in development", async () => {
    const { reactRouterMock, restore } = await withMocks({
      env: "development",
    });
    expect(reactRouterMock.lastOptions).not.toBeNull();
    const { cookie } = reactRouterMock.lastOptions!;
    expect(cookie.name).toBe("__session");
    expect(cookie.sameSite).toBe("lax");
    expect(cookie.path).toBe("/");
    expect(cookie.httpOnly).toBe(true);
    expect(cookie.secure).toBe(false);
    expect(cookie.secrets).toEqual(["default-secret"]);
    restore();
  });

  it("uses server secret in production", async () => {
    const { reactRouterMock, restore } = await withMocks({
      env: "production",
      serverSecret: "prod-secret",
      nodeEnv: "production",
    });
    const { cookie } = reactRouterMock.lastOptions!;
    expect(cookie.secure).toBe(true);
    expect(cookie.secrets).toEqual(["prod-secret"]);
    restore();
  });

  it("setAuthSession commits session and returns header", async () => {
    const { module, reactRouterMock, restore } = await withMocks();
    const req = new Request(requestURL, { headers: { Cookie: "" } });
    const res = await module.setAuthSession({
      accessToken: "a1",
      expiresAt: futureTs(),
      refreshToken: "r1",
      request: req,
    });
    expect(reactRouterMock.commitSession).toHaveBeenCalledTimes(1);
    expect(res).toBe("mock-set-cookie=1");
    restore();
  });

  it("setAuthSession throws error when commitSession fails", async () => {
    const { module, reactRouterMock, restore } = await withMocks();
    reactRouterMock.commitSession.mockImplementationOnce(async () => {
      throw new Error("commit failed");
    });
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const req = new Request(requestURL);
    await expect(
      module.setAuthSession({
        accessToken: "a1",
        expiresAt: futureTs(),
        refreshToken: "r1",
        request: req,
      }),
    ).rejects.toThrow("Failed to set/update session");
    expect(errSpy).toHaveBeenCalled();
    restore();
  });

  it("getAuthData returns tokens when valid", async () => {
    const { module, restore } = await withMocks();
    const cookie = `accessToken=tok; expiresAt=${futureTs()}; refreshToken=ref`;
    const req = new Request(requestURL, { headers: { Cookie: cookie } });
    const res = await module.getAuthData(req);
    expect(res).toEqual({
      authenticationTokens: {
        accessToken: "tok",
        expiresAt: expect.any(Number),
        refreshToken: "ref",
      },
      sessionCookieHeader: "",
    });
    restore();
  });

  it("getAuthData calls refreshAccessToken when expired and a refreshToken is available", async () => {
    const refreshResponse = {
      authenticationTokens: {
        accessToken: "new",
        expiresAt: 1,
        refreshToken: "newref",
      },
      sessionCookieHeader: "hdr",
    };
    const { module, mocks, restore } = await withMocks({ refreshResponse });
    const cookie = `accessToken=tok; expiresAt=${pastTs()}; refreshToken=present`;
    const req = new Request(requestURL, { headers: { Cookie: cookie } });
    const res = await module.getAuthData(req);
    expect(mocks.refreshAccessTokenMock).toHaveBeenCalledWith(req, "present");
    expect(res).toEqual(refreshResponse);
    restore();
  });

  it("getAuthData handles token refresh errors via login page redirect and destroys session", async () => {
    const { module, mocks, reactRouterMock, restore } = await withMocks();
    mocks.refreshAccessTokenMock.mockImplementationOnce(async () => {
      throw new Error("Refresh token expired");
    });
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const cookie = `accessToken=tok; expiresAt=${pastTs()}; refreshToken=expired`;
    const req = new Request(requestURL, { headers: { Cookie: cookie } });
    await expect(module.getAuthData(req)).rejects.toThrow("redirect to");
    expect(mocks.refreshAccessTokenMock).toHaveBeenCalledWith(req, "expired");
    expect(errSpy).toHaveBeenCalledWith(
      "access token refresh not possible, redirect user to login and destroy the session",
      expect.any(Error),
    );
    expect(reactRouterMock.destroySession).toHaveBeenCalled();
    errSpy.mockRestore();
    restore();
  });

  it("getAuthData returns current token data when a token is expired and no refreshToken available", async () => {
    const { module, mocks, restore } = await withMocks();
    const cookie = `accessToken=tok; expiresAt=${pastTs()}`;
    const req = new Request(requestURL, { headers: { Cookie: cookie } });
    const res = await module.getAuthData(req);
    expect(mocks.refreshAccessTokenMock).not.toHaveBeenCalled();
    expect(res).toEqual({
      authenticationTokens: {
        accessToken: "tok",
        expiresAt: expect.any(Number),
        refreshToken: undefined,
      },
      sessionCookieHeader: "",
    });
    restore();
  });
});
