import type { ActionFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/services/auth/betterAuth.server", () => ({
  auth: { api: { signInSocial: vi.fn() } },
}));

vi.mock("~/config/config", () => ({
  config: vi.fn(() => ({
    ENVIRONMENT: "development",
    LOG_LEVEL: "info",
    SENTRY_DSN: "",
  })),
}));

import { config } from "~/config/config";
import { action } from "~/routes/action.login-user";
import { LoginType } from "~/services/auth/auth.types.ts";
import { auth } from "~/services/auth/betterAuth.server";

describe("/action/login-user action", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(config).mockReturnValue({
      ENVIRONMENT: "development",
      LOG_LEVEL: "info",
      SENTRY_DSN: "",
    });
  });

  it("redirects to the BeA authorization URL and forwards the state/PKCE cookie", async () => {
    vi.mocked(auth.api.signInSocial).mockResolvedValue({
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

    expect(auth.api.signInSocial).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          provider: "bea",
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
    vi.mocked(auth.api.signInSocial).mockResolvedValue({
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

    expect(auth.api.signInSocial).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          provider: "kompla-idp",
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

  it("forwards the next URL after login to Better Auth", async () => {
    vi.mocked(auth.api.signInSocial).mockResolvedValue({
      response: {
        url: "https://idp.example/kompla-idp/authorize",
        redirect: true,
      },
      headers: new Headers({ "Set-Cookie": "better-auth.oauth_state=xyz" }),
    } as never);

    const formData = new FormData();
    formData.append("loginType", LoginType.KomplaIdp);
    formData.append("next", "/foo");

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);

    expect(auth.api.signInSocial).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          callbackURL: "/foo",
        }),
      }),
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
