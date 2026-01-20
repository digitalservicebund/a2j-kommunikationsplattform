import { beforeEach, describe, expect, it, vi } from "vitest";

const MODULE_PATH = "../auth.server";

async function withMocks({
  authData = null,
}: {
  authData?: {
    authenticationTokens: {
      accessToken: string;
      expiresAt: number;
      refreshToken: string;
    };
    sessionCookieHeader: string;
  } | null;
} = {}) {
  vi.resetModules();

  const getAuthDataMock = vi.fn(async () => authData);

  vi.doMock("~/services/auth/authSession.server", () => ({
    getAuthData: getAuthDataMock,
  }));

  const redirectMock = vi.fn((url: string) => {
    const error = new Error(`redirect to ${url}`) as Error & {
      status: number;
      location: string;
    };
    error.status = 302;
    error.location = url;
    throw error;
  });

  const hrefMock = vi.fn((path: string) => path);

  vi.doMock("react-router", () => ({
    createContext: vi.fn(() => Symbol("context")),
    redirect: redirectMock,
    href: hrefMock,
  }));

  const module = await import(MODULE_PATH);

  return {
    module,
    mocks: { getAuthDataMock, redirectMock, hrefMock },
    restore: () => {
      vi.clearAllMocks();
    },
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("authMiddleware", () => {
  it("redirects to /login when not authenticated", async () => {
    const { module, restore } = await withMocks({ authData: null });

    const request = new Request("http://localhost/protected");
    const contextSetMock = vi.fn();
    const nextMock = vi.fn();

    await expect(
      module.authMiddleware(
        { request, context: { set: contextSetMock } },
        nextMock,
      ),
    ).rejects.toThrow("redirect to /login");

    expect(nextMock).not.toHaveBeenCalled();
    expect(contextSetMock).not.toHaveBeenCalled();
    restore();
  });

  it("sets auth context and calls next when authenticated", async () => {
    const authData = {
      authenticationTokens: {
        accessToken: "token",
        expiresAt: Date.now() + 60000, // 1 minute in the future
        refreshToken: "refresh",
      },
      sessionCookieHeader: "",
    };
    const { module, restore } = await withMocks({ authData });

    const request = new Request("http://localhost/protected");
    const contextSetMock = vi.fn();
    const mockResponse = new Response("OK", { status: 200 });
    const nextMock = vi.fn(async () => mockResponse);

    const result = await module.authMiddleware(
      { request, context: { set: contextSetMock } },
      nextMock,
    );

    expect(contextSetMock).toHaveBeenCalledWith(module.authContext, authData);
    expect(nextMock).toHaveBeenCalled();
    expect(result).toBe(mockResponse);
    restore();
  });

  it("appends Set-Cookie header when sessionCookieHeader is present", async () => {
    const authData = {
      authenticationTokens: {
        accessToken: "token",
        expiresAt: Date.now() + 60000,
        refreshToken: "refresh",
      },
      sessionCookieHeader: "__session=abc123; Path=/; HttpOnly",
    };
    const { module, restore } = await withMocks({ authData });

    const request = new Request("http://localhost/protected");
    const contextSetMock = vi.fn();
    const mockResponse = new Response("OK", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    const nextMock = vi.fn(async () => mockResponse);

    const result = await module.authMiddleware(
      { request, context: { set: contextSetMock } },
      nextMock,
    );

    // expect(result).not.toBe(mockResponse); // Should be a new response
    expect(result.headers.get("Set-Cookie")).toBe(
      "__session=abc123; Path=/; HttpOnly",
    );
    expect(result.headers.get("Content-Type")).toBe("application/json");
    expect(result.status).toBe(200);
    restore();
  });

  it("preserves response body when creating new response with cookie", async () => {
    const authData = {
      authenticationTokens: {
        accessToken: "token",
        expiresAt: Date.now() + 60000,
        refreshToken: "refresh",
      },
      sessionCookieHeader: "__session=xyz",
    };
    const { module, restore } = await withMocks({ authData });

    const request = new Request("http://localhost/protected");
    const contextSetMock = vi.fn();
    const bodyContent = JSON.stringify({ data: "test" });
    const mockResponse = new Response(bodyContent, {
      status: 201,
      statusText: "Created",
    });
    const nextMock = vi.fn(async () => mockResponse);

    const result = await module.authMiddleware(
      { request, context: { set: contextSetMock } },
      nextMock,
    );

    expect(result.status).toBe(201);
    expect(result.statusText).toBe("Created");
    const resultBody = await result.text();
    expect(resultBody).toBe(bodyContent);
    restore();
  });
});
