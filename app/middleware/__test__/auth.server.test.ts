import { redirect, RouterContextProvider } from "react-router";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { getAuthSession } from "~/services/auth/authSession.server";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { authContext, authMiddleware } from "../auth.server";

vi.mock(import("react-router"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    // Let redirect() return a plain object instead of a `Response` so that
    // `toThrow()` does a proper equality check on the redirect location.
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    redirect: vi.fn((url, init) => ({ url, init }) as unknown as Response),
  };
});

vi.mock("~/services/auth/authSession.server", () => ({
  getAuthSession: vi.fn(() => Promise.resolve(null)),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe(authMiddleware, () => {
  async function callAuthMiddleware(params: {
    url: string;
    rawRequestURL?: string;
    context?: RouterContextProvider;
    next?: Mock;
  }) {
    const context = params.context ?? new RouterContextProvider();
    const next =
      params.next ?? vi.fn(() => Promise.resolve(new Response("OK")));

    const response = await authMiddleware(
      {
        url: new URL(params.url),
        pattern: params.url,
        request: new Request(params.rawRequestURL ?? params.url),
        params: {},
        context,
      },
      next,
    );

    expect(response, "Middleware should return a response").toBeDefined();

    return {
      response: response!,
      context,
      next,
    };
  }

  it("redirects to /login when not authenticated", async () => {
    vi.mocked(getAuthSession).mockResolvedValue(null);
    const context = new RouterContextProvider();
    const next = vi.fn(() => Promise.resolve(new Response("OK")));

    await expect(
      callAuthMiddleware({
        url: "http://localhost/protected",
        context,
        next,
      }),
    ).rejects.toThrow(redirect("/login?next=%2Fprotected"));

    expect(next).not.toHaveBeenCalled();
    expect(context.get(authContext)).toBeNull();
  });

  it("uses the clean URL as the `next` parameter to /login", async () => {
    vi.mocked(getAuthSession).mockResolvedValue(null);

    await expect(
      callAuthMiddleware({
        url: "http://localhost/protected",
        rawRequestURL: "http://localhost/protected.data",
      }),
    ).rejects.toThrow(redirect("/login?next=%2Fprotected"));
  });

  it("sets auth context and calls next when authenticated", async () => {
    const authSession = makeAuthSession();
    vi.mocked(getAuthSession).mockResolvedValue(authSession);

    const mockResponse = new Response("OK", { status: 200 });
    const next = vi.fn(() => Promise.resolve(mockResponse));

    const { response, context } = await callAuthMiddleware({
      url: "http://localhost/protected",
      next,
    });

    expect(context.get(authContext)).toBe(authSession);
    expect(next).toHaveBeenCalled();
    expect(response).toBe(mockResponse);
  });

  it("appends Set-Cookie header when authSession.sessionCookieHeader is present", async () => {
    const sessionCookieHeader = "__session=abc123; Path=/; HttpOnly";
    vi.mocked(getAuthSession).mockResolvedValue(
      makeAuthSession({ sessionCookieHeaders: [sessionCookieHeader] }),
    );

    const { response } = await callAuthMiddleware({
      url: "http://localhost/protected",
    });

    expect(response.headers.get("Set-Cookie")).toBe(
      "__session=abc123; Path=/; HttpOnly",
    );
  });

  it("preserves response body when creating new response with cookie", async () => {
    vi.mocked(getAuthSession).mockResolvedValue(
      makeAuthSession({
        accessToken: "token",
        sessionCookieHeaders: ["__session=xyz"],
      }),
    );

    const mockResponse = new Response('{"example":"content"}', {
      status: 201,
      statusText: "Created",
    });

    const { response } = await callAuthMiddleware({
      url: "http://localhost/protected",
      next: vi.fn(() => Promise.resolve(mockResponse)),
    });

    await expect(response.text()).resolves.toBe('{"example":"content"}');
  });
});
