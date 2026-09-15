import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../betterAuth.server", () => ({
  auth: { api: { signInCustom: vi.fn() } },
}));

import { AuthenticationProvider } from "../auth.types";
import { auth } from "../betterAuth.server";
import { loginAsDeveloper } from "../loginAsDeveloper.server";

describe("loginAsDeveloper", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("establishes a custom Better Auth session and redirects to /", async () => {
    vi.mocked(auth.api.signInCustom).mockResolvedValue(
      new Response(null, {
        headers: { "Set-Cookie": "a-cookie-value" },
      }) as never,
    );

    const result = await loginAsDeveloper();

    expect(auth.api.signInCustom).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          provider: AuthenticationProvider.DEVELOPMENT,
        }),
        asResponse: true,
      }),
    );
    expect(result.status).toBe(302);
    expect(result.headers.get("Location")).toBe("/");
    expect(result.headers.get("Set-Cookie")).toBe("a-cookie-value");
  });

  it("returns a 500 response when signInCustom fails", async () => {
    vi.mocked(auth.api.signInCustom).mockRejectedValue(
      new Error("could not set session data"),
    );

    const result = await loginAsDeveloper();

    expect(result.status).toBe(500);
  });
});
