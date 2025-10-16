import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const MODULE_PATH = "~/services/auth/session.server";

// Helpers to reload the module under different mocks
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

  // Mock config() and serverConfig()
  vi.doMock("~/config/config", () => {
    return {
      config: () => ({ ENVIRONMENT: env }),
    };
  });

  vi.doMock("~/config/config.server", () => {
    return {
      serverConfig: () => ({ BRAK_IDP_OIDC_CLIENT_SECRET: serverSecret }),
    };
  });

  // Keep NODE_ENV controllable (affects cookie.secure)
  const prevNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = nodeEnv;

  // A tiny in-memory "session" that just exposes get/set
  type MockSession = {
    get: (k: string) => string | number | null | undefined;
    set: (k: string, v: string | number | null | undefined) => void;
  };

  // Simple cookie parser for our mock getSession
  const parseCookie = (cookieStr: string | null) => {
    const out: Record<string, string> = {};
    if (!cookieStr) return out;
    cookieStr.split(";").forEach((part) => {
      const [k, v] = part.split("=").map((s) => s.trim());
      if (k) out[k] = v ?? "";
    });
    return out;
  };

  // Shared mock state for the 'react-router' mock
  const reactRouterMock = {
    lastOptions: null,
    getSession: vi.fn(
      async (cookieStr: string | null): Promise<MockSession> => {
        const store = new Map<string, string | number>(
          Object.entries(parseCookie(cookieStr || null)),
        );
        // Normalize expiresAt to number if present
        if (store.has("expiresAt")) {
          const raw = store.get("expiresAt");
          const num = Number(raw);
          store.set("expiresAt", (Number.isNaN(num) ? raw : num) as number);
        }
        return {
          get: (k: string) => store.get(k),
          set: (k: string, v) => {
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

  // Mock 'react-router' with our storage + redirect
  vi.doMock("react-router", () => {
    return {
      createCookieSessionStorage: (options: null) => {
        reactRouterMock.lastOptions = options;
        return {
          getSession: reactRouterMock.getSession,
          commitSession: reactRouterMock.commitSession,
          destroySession: reactRouterMock.destroySession,
        };
      },
      redirect: reactRouterMock.redirect,
      __mock: reactRouterMock, // expose internals for assertions
    };
  });

  const module = await import(MODULE_PATH);
  const reactRouter = await import("react-router");

  return {
    module,
    reactRouterMock: reactRouter.__mock as typeof reactRouterMock,
    restore: () => {
      process.env.NODE_ENV = prevNodeEnv;
    },
  };
}

const futureTs = () => Date.now() + 60_000;
const pastTs = () => Date.now() - 60_000;

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("session.server", () => {
  it("uses default secret in development", async () => {
    const { reactRouterMock, restore } = await withMocks({
      env: "development",
      nodeEnv: "test",
    });

    // Assert cookie options passed to createCookieSessionStorage
    expect(reactRouterMock.lastOptions).toBeTruthy();
    expect(reactRouterMock.lastOptions.cookie.name).toBe("__session");
    expect(reactRouterMock.lastOptions.cookie.sameSite).toBe("lax");
    expect(reactRouterMock.lastOptions.cookie.path).toBe("/");
    expect(reactRouterMock.lastOptions.cookie.httpOnly).toBe(true);
    // secure depends on NODE_ENV === 'production'
    expect(reactRouterMock.lastOptions.cookie.secure).toBe(false);
    // secret comes from getSecret(): development -> "default-secret"
    expect(reactRouterMock.lastOptions.cookie.secrets).toEqual([
      "default-secret",
    ]);

    restore();
  });

  it("uses server secret when ENVIRONMENT != development", async () => {
    const { reactRouterMock, restore } = await withMocks({
      env: "production",
      serverSecret: "super-secret-from-server",
      nodeEnv: "production",
    });

    expect(reactRouterMock.lastOptions.cookie.secure).toBe(true);
    expect(reactRouterMock.lastOptions.cookie.secrets).toEqual([
      "super-secret-from-server",
    ]);

    restore();
  });

  it("createUserSession commits a session with accessToken & expiresAt", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const req = new Request("https://example.test", {
      headers: { Cookie: "" },
    });
    const result = await module.createUserSession("testToken", futureTs(), req);

    expect(reactRouterMock.commitSession).toHaveBeenCalledTimes(1);
    const calledWithSession = reactRouterMock.commitSession.mock.calls[0][0];
    expect(calledWithSession.get("accessToken")).toBe("testToken");
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
    const req = new Request("https://example.test");

    await expect(
      module.createUserSession("tok", futureTs(), req),
    ).rejects.toThrow("Failed to create user session");
    expect(errSpy).toHaveBeenCalled();

    restore();
  });

  it("getUserSession returns null and destroys session if no accessToken", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const req = new Request("https://example.test", {
      headers: { Cookie: "" },
    });
    const result = await module.getUserSession(req);

    expect(result).toBeNull();
    expect(reactRouterMock.destroySession).toHaveBeenCalledTimes(1);

    restore();
  });

  it("getUserSession returns null and destroys session if expired", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const cookie = `accessToken=testToken; expiresAt=${pastTs()}`;
    const req = new Request("https://example.test", {
      headers: { Cookie: cookie },
    });

    const result = await module.getUserSession(req);
    expect(result).toBeNull();
    expect(reactRouterMock.destroySession).toHaveBeenCalledTimes(1);

    restore();
  });

  it("getUserSession returns AuthenticationContext when valid", async () => {
    const { module, reactRouterMock, restore } = await withMocks({});

    const cookie = `accessToken=testToken; expiresAt=${futureTs()}`;
    const req = new Request("https://example.test", {
      headers: { Cookie: cookie },
    });

    const ctx = await module.getUserSession(req);
    expect(ctx).toEqual({
      accessToken: "testToken",
      expiresAt: expect.any(Number),
    });
    expect(reactRouterMock.destroySession).not.toHaveBeenCalled();

    restore();
  });

  it("requireUserSession returns the session when present", async () => {
    const { module, restore } = await withMocks({});

    const cookie = `accessToken=testToken; expiresAt=${futureTs()}`;
    const req = new Request("https://example.test/profile", {
      headers: { Cookie: cookie },
    });

    const res = await module.requireUserSession(req);
    expect(res).toEqual({
      accessToken: "testToken",
      expiresAt: expect.any(Number),
    });

    restore();
  });

  it("requireUserSession throws a redirect Response to /login when missing", async () => {
    const { module, restore } = await withMocks({});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const req = new Request("https://example.test", {
      headers: { Cookie: "" },
    });

    try {
      await module.requireUserSession(req);
      throw new Error("Expected redirect to be thrown");
    } catch (e) {
      expect(e).toBeInstanceOf(Response);
      expect(e.status).toBe(302);
      expect(e.headers.get("Location")).toBe("/login");
      expect(logSpy).toHaveBeenCalled();
    }
    restore();
  });

  it("hasUserSession returns true when accessToken is present", async () => {
    const { module, restore } = await withMocks({});
    const withToken = new Request("https://example.test", {
      headers: { Cookie: `accessToken=testToken; expiresAt=${futureTs()}` },
    });
    await expect(module.hasUserSession(withToken)).resolves.toBe(true);
    restore();
  });

  it("hasUserSession returns false when accessToken is missing", async () => {
    const { module, restore } = await withMocks({});
    const withoutToken = new Request("https://example.test", {
      headers: { Cookie: "" },
    });
    await expect(module.hasUserSession(withoutToken)).resolves.toBe(false);
    restore();
  });
});
