import type { ActionFunctionArgs, RouterContextProvider } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/services/auth/betterAuth.server", () => ({
  auth: { api: { signOut: vi.fn() } },
}));

import { auth } from "~/services/auth/betterAuth.server";
import { action, LogoutType } from "../action.logout-user";

const testContext: Readonly<RouterContextProvider> = {
  get: () => {
    throw new Error("test context get should not be called");
  },
  set: () => {},
};

describe("/action/logout-user route", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(auth.api.signOut).mockResolvedValue(
      new Response(null, {
        headers: { "Set-Cookie": "better-auth.session=; Max-Age=0" },
      }) as never,
    );
  });

  it("redirects with auto-logged-out status URL params on auto logout", async () => {
    const formData = new FormData();
    formData.append("logoutType", LogoutType.Automatic);

    const options = {
      method: "POST",
      body: formData,
    };

    const request = new Request(
      "http://localhost:3000/action/logout-user",
      options,
    );

    const response = await action({
      request,
      params: {},
      context: testContext,
    } as ActionFunctionArgs);

    expect(auth.api.signOut).toHaveBeenCalledWith(
      expect.objectContaining({ asResponse: true }),
    );
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe(
      "/login?status=auto-logged-out",
    );
    expect(response.headers.get("Set-Cookie")).toBe(
      "better-auth.session=; Max-Age=0",
    );
  });

  it("redirects with logged-out status URL params on logout by user", async () => {
    const formData = new FormData();
    formData.append("logoutType", LogoutType.ByUser);

    const options = {
      method: "POST",
      body: formData,
    };

    const request = new Request(
      "http://localhost:3000/action/logout-user",
      options,
    );

    const response = await action({
      request,
      params: {},
      context: testContext,
    } as ActionFunctionArgs);

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/login?status=logged-out");
  });
});
