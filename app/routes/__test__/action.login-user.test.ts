import { RouterContextProvider } from "react-router";
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

  function mockOAuthAuthorizationResponse(response: {
    redirectURL: string;
    stateCookie: string;
  }) {
    vi.mocked(auth.api.signInSocial).mockResolvedValue({
      response: { redirect: true, url: response.redirectURL },
      headers: new Headers({ "Set-Cookie": response.stateCookie }),
    } as never);
  }

  function callLoginAction(formData: FormData) {
    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });
    return action({
      request,
      url: new URL(request.url),
      pattern: "/login",
      params: {},
      context: new RouterContextProvider(),
    });
  }

  describe("with beA login type", () => {
    const loginType = LoginType.BeA;

    it("redirects to the BRAK IdP authorization URL and forwards the state/PKCE cookie", async () => {
      mockOAuthAuthorizationResponse({
        redirectURL: "https://idp.example/bea/authorize",
        stateCookie: "better-auth.oauth_state=abc",
      });

      const formData = new FormData();
      formData.append("loginType", loginType);

      const response = await callLoginAction(formData);

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
  });

  describe("with KomPla IdP login type", () => {
    const loginType = LoginType.KomplaIdp;

    it("redirects to the KomPla IdP authorization URL and forwards the state/PKCE cookie", async () => {
      mockOAuthAuthorizationResponse({
        redirectURL: "https://idp.example/kompla-idp/authorize",
        stateCookie: "better-auth.oauth_state=xyz",
      });

      const formData = new FormData();
      formData.append("loginType", loginType);

      const response = await callLoginAction(formData);

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
  });

  describe("with invalid login type", () => {
    const loginType = "invalid";

    it("returns 400 response", async () => {
      const formData = new FormData();
      formData.append("loginType", loginType);

      const response = await callLoginAction(formData);

      expect(response.status).toBe(400);
    });
  });

  describe("with next URL to redirect to after login", () => {
    beforeEach(() => {
      mockOAuthAuthorizationResponse({
        redirectURL: "https://idp.example/kompla-idp/authorize",
        stateCookie: "better-auth.oauth_state=xyz",
      });
    });

    it("forwards the URL to Better Auth if valid", async () => {
      const nextURL = "/foo";

      const formData = new FormData();
      formData.append("loginType", LoginType.KomplaIdp);
      formData.append("next", nextURL);

      await callLoginAction(formData);

      expect(auth.api.signInSocial).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            callbackURL: nextURL,
          }),
        }),
      );
    });

    it("falls back to the root URL if the URL is not same-origin", async () => {
      const nextURL = "https://malicious-website.com/foo";

      const formData = new FormData();
      formData.append("loginType", LoginType.KomplaIdp);
      formData.append("next", nextURL);

      await callLoginAction(formData);

      expect(auth.api.signInSocial).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            callbackURL: "/",
          }),
        }),
      );
    });

    it("falls back to the root URL if the URL is starts with two slashes (scheme-less absolute URL)", async () => {
      const nextURL = "//malicious-website.com/foo";

      const formData = new FormData();
      formData.append("loginType", LoginType.KomplaIdp);
      formData.append("next", nextURL);

      await callLoginAction(formData);

      expect(auth.api.signInSocial).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            callbackURL: "/",
          }),
        }),
      );
    });
  });
});
