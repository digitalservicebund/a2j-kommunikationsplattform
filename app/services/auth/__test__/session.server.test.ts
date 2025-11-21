import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";

const MODULE_PATH = "../session.server";
const requestURL = "http://localhost/session-test";
const accessToken = "test-access-token-session";

type CookieSameSite = "lax" | "strict" | "none";

type SessionModule = {
  createUserSession: (
    accessToken: string,
    expiresAt: number,
    request: Request,
  ) => Promise<string>;
  getUserSession: (
    request: Request,
  ) => Promise<{ accessToken: string; expiresAt: number } | null>;
  updateUserSession: (opts: {
    apiAccessToken: string;
    apiAccessExpiresAt: number;
    apiRefreshToken: string;
    apiRefreshExpiresAt: number;
    request: Request;
  }) => Promise<string | null>;
  requireUserSession: (
    request: Request,
  ) => Promise<{ accessToken: string; expiresAt: number }>;
};

interface CookieOptions {
  name: string;
  sameSite: CookieSameSite;
  path: string;
  httpOnly: boolean;
  secrets: string[];
  secure: boolean;
}
interface CookieSessionStorageInit {
  cookie: CookieOptions;
}

type SessionValue = string | number | null | undefined;

type MockSession = {
  get: (k: string) => SessionValue;
  set: (k: string, v: SessionValue) => void;
};

type GetSessionMock = Mock<(cookieStr: string | null) => Promise<MockSession>>;
type CommitSessionMock = Mock<(session: MockSession) => Promise<string>>;
type DestroySessionMock = Mock<(session: MockSession) => Promise<void>>;

interface ReactRouterMock {
  lastOptions: CookieSessionStorageInit | null;
  getSession: GetSessionMock;
  commitSession: CommitSessionMock;
  destroySession: DestroySessionMock;
  redirect: (url: string) => Response;
}

async function withMocks({
  env = "development",
  serverSecret = "server-secret-123",
  nodeEnv = "test",
}: {
  env?: "development" | "production" | string;
  serverSecret?: string;
  nodeEnv?: string;
}) {
  vi.resetModules();

  vi.doMock("~/config/config", () => {
    return { config: () => ({ ENVIRONMENT: env }) };
  });

  vi.doMock("~/config/config.server", () => {
    return {
      serverConfig: () => ({ BRAK_IDP_OIDC_CLIENT_SECRET: serverSecret }),
    };
  });

  const prevNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = nodeEnv;

  const parseCookie = (cookieStr: string | null) => {
    const out: Record<string, string> = {};
    if (!cookieStr) return out;
    cookieStr.split(";").forEach((part) => {
      const [k, v] = part.split("=").map((s) => s.trim());
      if (k) out[k] = v ?? "";
    });
    return out;
  };

  const reactRouterMock: ReactRouterMock = {
    lastOptions: null,
    getSession: vi.fn(
      async (cookieStr: string | null): Promise<MockSession> => {
        const store = new Map<string, SessionValue>(
          Object.entries(parseCookie(cookieStr)),
        );
        if (store.has("expiresAt")) {
          const raw = store.get("expiresAt");
          const num = Number(raw);
          store.set("expiresAt", Number.isNaN(num) ? raw : num);
        }
        return {
          get: (k: string) => store.get(k),
          set: (k: string, v: SessionValue) => {
            store.set(k, v);
          },
        };
      },
    ),
    commitSession: vi.fn(async () => "mock-set-cookie=1"),
    destroySession: vi.fn(async () => {}),
    redirect: (url: string) =>
      new Response(null, { status: 302, headers: { Location: url } }),
  };

  vi.doMock("react-router", () => {
    return {
      createCookieSessionStorage: (options: CookieSessionStorageInit) => {
        reactRouterMock.lastOptions = options;
        return {
          getSession: reactRouterMock.getSession,
          commitSession: reactRouterMock.commitSession,
          destroySession: reactRouterMock.destroySession,
        };
      },
      redirect: reactRouterMock.redirect,
      __mock: reactRouterMock, // exposes internals for assertions
    } as const;
  });

  // Types for dynamic imports to avoid using 'any'
  const module = (await import(MODULE_PATH)) as SessionModule;
  const reactRouter = (await import("react-router")) as unknown as {
    __mock: ReactRouterMock;
  };

  return {
    module,
    reactRouterMock: reactRouter.__mock,
    restore: () => {
      process.env.NODE_ENV = prevNodeEnv;
    },
  };
}

const futureTs = (): number => Date.now() + 60_000;
const pastTs = (): number => Date.now() - 60_000;

beforeEach(() => {
  vi.clearAllMocks();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe.skip("session.server", () => {
  it("uses default secret in development", async () => {
    const { reactRouterMock, restore } = await withMocks({
      env: "development",
      nodeEnv: "test",
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

  it("uses server secret when ENVIRONMENT is not development", async () => {
    const { reactRouterMock, restore } = await withMocks({
      env: "production",
      serverSecret: "super-secret-from-server",
      nodeEnv: "production",
    });

    expect(reactRouterMock.lastOptions).not.toBeNull();
    const { cookie } = reactRouterMock.lastOptions!;
    expect(cookie.secure).toBe(true);
    expect(cookie.secrets).toEqual(["super-secret-from-server"]);

    restore();
  });

  it("createUserSession commits a session with accessToken & expiresAt", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const req = new Request(requestURL, {
      headers: { Cookie: "" },
    });
    const result = await module.createUserSession(accessToken, futureTs(), req);

    expect(reactRouterMock.commitSession).toHaveBeenCalledTimes(1);
    const calledWithSession = reactRouterMock.commitSession.mock.calls[0][0];
    expect(calledWithSession.get("accessToken")).toBe(accessToken);
    expect(typeof calledWithSession.get("expiresAt")).toBe("number");
    expect(result).toBe("mock-set-cookie=1");

    restore();
  });

  it("createUserSession throws a wrapped error if commitSession fails", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});
    reactRouterMock.commitSession.mockImplementationOnce(async () => {
      throw new Error("Failed to create user session");
    });

    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const req = new Request(requestURL);

    await expect(
      module.createUserSession(accessToken, futureTs(), req),
    ).rejects.toThrow("Failed to create user session");
    expect(errSpy).toHaveBeenCalled();

    restore();
  });

  it("updateUserSession commits a session with API tokens", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const req = new Request(requestURL, {
      headers: { Cookie: "" },
    });

    const result = await module.updateUserSession({
      apiAccessToken: "api-access-1",
      apiAccessExpiresAt: 1_234_567,
      apiRefreshToken: "api-refresh-1",
      apiRefreshExpiresAt: 7_654_321,
      request: req,
    });

    expect(reactRouterMock.commitSession).toHaveBeenCalledTimes(1);
    const calledWithSession = reactRouterMock.commitSession.mock.calls[0][0];
    expect(calledWithSession.get("apiAccessToken")).toBe("api-access-1");
    expect(calledWithSession.get("apiAccessExpiresAt")).toBe(1_234_567);
    expect(calledWithSession.get("apiRefreshToken")).toBe("api-refresh-1");
    expect(calledWithSession.get("apiRefreshExpiresAt")).toBe(7_654_321);
    expect(result).toBe("mock-set-cookie=1");

    restore();
  });

  it("updateUserSession throws a wrapped error if commitSession fails", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});
    reactRouterMock.commitSession.mockImplementationOnce(async () => {
      throw new Error("Failed to update session");
    });

    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const req = new Request(requestURL);

    await expect(
      module.updateUserSession({
        apiAccessToken: "api-access-1",
        apiAccessExpiresAt: 1_234_567,
        apiRefreshToken: "api-refresh-1",
        apiRefreshExpiresAt: 7_654_321,
        request: req,
      }),
    ).rejects.toThrow("Failed to update the user session");
    expect(errSpy).toHaveBeenCalled();

    restore();
  });

  it("getUserSession returns null and destroys session if no accessToken is available", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const req = new Request(requestURL, {
      headers: { Cookie: "" },
    });

    const result = await module.getUserSession(req);

    expect(result).toBeNull();
    expect(reactRouterMock.destroySession).toHaveBeenCalledTimes(1);

    restore();
  });

  it("getUserSession returns null and destroys session if it is expired", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});
    const cookie = `accessToken=testToken; expiresAt=${pastTs()}`;
    const req = new Request(requestURL, {
      headers: { Cookie: cookie },
    });

    const result = await module.getUserSession(req);

    expect(result).toBeNull();
    expect(reactRouterMock.destroySession).toHaveBeenCalledTimes(1);

    restore();
  });

  it("getUserSession returns AuthenticationContext when valid", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});
    const cookie = `accessToken=${accessToken}; expiresAt=${futureTs()}`;
    const req = new Request(requestURL, {
      headers: { Cookie: cookie },
    });

    const ctx = await module.getUserSession(req);

    expect(ctx).toEqual({
      accessToken: accessToken,
      expiresAt: expect.any(Number),
    });
    expect(reactRouterMock.destroySession).not.toHaveBeenCalled();

    restore();
  });

  it("requireUserSession returns the session when present", async () => {
    const { module, restore } = await withMocks({});
    const cookie = `accessToken=${accessToken}; expiresAt=${futureTs()}`;
    const req = new Request(requestURL, {
      headers: { Cookie: cookie },
    });

    const res = await module.requireUserSession(req);
    expect(res).toEqual({
      accessToken: accessToken,
      expiresAt: expect.any(Number),
    });

    restore();
  });

  it("requireUserSession triggers a redirect to /login if it is missing.", async () => {
    const { module, restore } = await withMocks({});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const req = new Request(requestURL, {
      headers: { Cookie: "" },
    });

    try {
      await module.requireUserSession(req);
      throw new Error("Expected redirect to be thrown");
    } catch (error) {
      // Type safety guard for Response
      if (error instanceof Response) {
        expect(error.status).toBe(302);
        expect(error.headers.get("Location")).toBe("/login");
        expect(logSpy).toHaveBeenCalled();
      } else {
        throw error; // rethrow if not a Response
      }
    }
    restore();
  });
});

describe.skip("session.server - api token helpers", () => {
  it("updateUserSession commits a session with API tokens", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const req = new Request(requestURL, {
      headers: { Cookie: "" },
    });

    const result = await module.updateUserSession({
      apiAccessToken: "api-access-1",
      apiAccessExpiresAt: 1_234_567,
      apiRefreshToken: "api-refresh-1",
      apiRefreshExpiresAt: 7_654_321,
      request: req,
    });

    expect(reactRouterMock.commitSession).toHaveBeenCalledTimes(1);
    const calledWithSession = reactRouterMock.commitSession.mock.calls[0][0];
    expect(calledWithSession.get("apiAccessToken")).toBe("api-access-1");
    expect(calledWithSession.get("apiAccessExpiresAt")).toBe(1_234_567);
    expect(calledWithSession.get("apiRefreshToken")).toBe("api-refresh-1");
    expect(calledWithSession.get("apiRefreshExpiresAt")).toBe(7_654_321);
    expect(result).toBe("mock-set-cookie=1");

    restore();
  });

  it("updateUserSession throws a wrapped error if commitSession fails", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});
    reactRouterMock.commitSession.mockImplementationOnce(async () => {
      throw new Error("Failed to update session");
    });

    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const req = new Request(requestURL);

    await expect(
      module.updateUserSession({
        apiAccessToken: "api-access-1",
        apiAccessExpiresAt: 1_234_567,
        apiRefreshToken: "api-refresh-1",
        apiRefreshExpiresAt: 7_654_321,
        request: req,
      }),
    ).rejects.toThrow("Failed to update the user session");
    expect(errSpy).toHaveBeenCalled();

    restore();
  });

  it("getUserSession returns API tokens when present in the session", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});
    const cookie = `accessToken=${accessToken}; expiresAt=${futureTs()}; apiAccessToken=apiA; apiAccessExpiresAt=111; apiRefreshToken=apiR; apiRefreshExpiresAt=222`;
    const req = new Request(requestURL, {
      headers: { Cookie: cookie },
    });

    const ctx = await module.getUserSession(req);

    expect(ctx).toEqual({
      accessToken: accessToken,
      expiresAt: expect.any(Number),
      apiAccessToken: "apiA",
      apiAccessExpiresAt: "111",
      apiRefreshToken: "apiR",
      apiRefreshExpiresAt: "222",
    });
    expect(reactRouterMock.destroySession).not.toHaveBeenCalled();

    restore();
  });
});
