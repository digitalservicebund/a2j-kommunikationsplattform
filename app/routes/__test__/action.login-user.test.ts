import type { ActionFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/services/auth/loginAsDeveloper.server", () => ({
  loginAsDeveloper: vi.fn(),
}));

vi.mock("~/services/auth/betterAuth.server", () => ({
  auth: { api: { signInWithOAuth2: vi.fn() } },
}));

vi.mock("~/config/config", () => ({
  config: vi.fn(() => ({ ENVIRONMENT: "development", SENTRY_DSN: "" })),
}));

import { config } from "~/config/config";
import { action, LoginType } from "~/routes/action.login-user";
import { auth } from "~/services/auth/betterAuth.server";
import { loginAsDeveloper } from "~/services/auth/loginAsDeveloper.server";

describe("/action/login-user action", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(config).mockReturnValue({
      ENVIRONMENT: "development",
      SENTRY_DSN: "",
    });
  });

  it('redirects to "/" on developer login', async () => {
    const mockedLogin = vi.mocked(loginAsDeveloper);

    mockedLogin.mockResolvedValue(
      new Response(null, { status: 302, headers: { Location: "/" } }),
    );

    const formData = new FormData();
    formData.append("loginType", LoginType.Developer);

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const res = response as Response;

    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toBe("/");
  });

  it("returns 403 for developer login outside development", async () => {
    vi.mocked(config).mockReturnValue({
      ENVIRONMENT: "production",
      SENTRY_DSN: "",
    });

    const formData = new FormData();
    formData.append("loginType", LoginType.Developer);

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const res = response as Response;

    expect(res.status).toBe(403);
    expect(loginAsDeveloper).not.toHaveBeenCalled();
  });

  it("redirects to the BeA authorization URL and forwards the state/PKCE cookie", async () => {
    vi.mocked(auth.api.signInWithOAuth2).mockResolvedValue({
      response: { url: "https://idp.example/bea/authorize", redirect: true },
      headers: new Headers({ "Set-Cookie": "better-auth.oauth_state=abc" }),
    } as never);

    const formData = new FormData();
    formData.append("loginType", LoginType.BeA);

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    const response = (await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs)) as Response;

    expect(auth.api.signInWithOAuth2).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          providerId: "bea",
          callbackURL: "/",
          errorCallbackURL: "/login?status=bea-login-error",
        }),
        returnHeaders: true,
      }),
    );
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe(
      "https://idp.example/bea/authorize",
    );
    expect(response.headers.get("Set-Cookie")).toBe(
      "better-auth.oauth_state=abc",
    );
  });

  it("redirects to the KomPla IdP authorization URL and forwards the state/PKCE cookie", async () => {
    vi.mocked(auth.api.signInWithOAuth2).mockResolvedValue({
      response: {
        url: "https://idp.example/kompla-idp/authorize",
        redirect: true,
      },
      headers: new Headers({ "Set-Cookie": "better-auth.oauth_state=xyz" }),
    } as never);

    const formData = new FormData();
    formData.append("loginType", LoginType.KomplaIdp);

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    const response = (await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs)) as Response;

    expect(auth.api.signInWithOAuth2).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          providerId: "kompla-idp",
          callbackURL: "/",
          errorCallbackURL: "/login?status=kompla-idp-login-error",
        }),
        returnHeaders: true,
      }),
    );
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe(
      "https://idp.example/kompla-idp/authorize",
    );
    expect(response.headers.get("Set-Cookie")).toBe(
      "better-auth.oauth_state=xyz",
    );
  });

  it("returns 400 for invalid login type", async () => {
    const formData = new FormData();
    formData.append("loginType", "invalid");

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const res = response as Response;

    expect(res.status).toBe(400);
  });
});
