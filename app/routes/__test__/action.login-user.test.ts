import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/mocks/auth/mockAuth.server", () => ({
  loginAsDeveloper: vi.fn(),
}));

vi.mock("~/services/auth/oAuth.server", () => ({
  authenticator: { authenticate: vi.fn() },
  AuthenticationProvider: { BEA: "bea" },
}));

import { loginAsDeveloper } from "~/mocks/auth/mockAuth.server";
import { LoginType, action } from "~/routes/action.login-user";
import { authenticator } from "~/services/auth/oAuth.server";

describe("/action/login-user action", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('redirects to "/" on developer login', async () => {
    // arrange: mock loginAsDeveloper to return a redirect response
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

    const response = await action({ request, params: {}, context: {} });
    const res = response as Response;

    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toBe("/");
  });

  it("delegates to authenticator for BeA login", async () => {
    // arrange: mock authenticator.authenticate to return an AuthenticationResponse
    const mockedAuth = vi.mocked(authenticator);
    const authResponse = {
      authenticationContext: {
        accessToken: "bea-token",
        expiresIn: Date.now() + 1000,
        refreshToken: "refresh-token",
      },
      sessionCookieHeader: "session=abc; Path=/; HttpOnly",
    };
    mockedAuth.authenticate.mockResolvedValue(authResponse);

    const formData = new FormData();
    formData.append("loginType", LoginType.BeA);

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    const response = await action({ request, params: {}, context: {} });
    // action should return the AuthenticationResponse from authenticator
    expect(response).toEqual(authResponse);
  });

  it("returns 400 for invalid login type", async () => {
    const formData = new FormData();
    formData.append("loginType", "invalid");

    const request = new Request("http://localhost/action/login-user", {
      method: "POST",
      body: formData,
    });

    const response = await action({ request, params: {}, context: {} });
    const res = response as Response;

    expect(res.status).toBe(400);
  });
});
