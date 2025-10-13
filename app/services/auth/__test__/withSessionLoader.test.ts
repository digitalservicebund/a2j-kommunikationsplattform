import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/services/auth/session.server", () => ({
  requireUserSession: vi.fn(),
}));

import { LoaderFunctionArgs } from "react-router";
import { AuthenticationContext } from "~/services/auth/oAuth.server";
import { requireUserSession } from "~/services/auth/session.server";
import { withSessionLoader } from "~/services/auth/withSessionLoader";

describe("withSessionLoader", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("calls wrapped loader with userSession and returns its result", async () => {
    const mockSession = {
      accessToken: "token-123",
      expiresAt: Date.now() + 1000,
    };
    (requireUserSession as unknown as Mock).mockResolvedValue(mockSession);

    const wrappedLoader = vi.fn(
      async (
        args: LoaderFunctionArgs & { userSession: AuthenticationContext },
      ) => {
        // ensure userSession has been injected
        return { ok: true, sessionToken: args.userSession?.accessToken };
      },
    );

    const loader = withSessionLoader(wrappedLoader);

    const result = await loader({
      request: new Request("http://localhost/"),
      params: {},
      context: {},
    });

    expect(wrappedLoader).toHaveBeenCalled();
    expect(result).toEqual({ ok: true, sessionToken: "token-123" });
  });

  it("propagates error (redirect) thrown by requireUserSession", async () => {
    const thrown = new Error("redirect-to-login");
    (requireUserSession as unknown as Mock).mockRejectedValue(thrown);

    const wrappedLoader = vi.fn(async () => ({ ok: true }));
    const loader = withSessionLoader(wrappedLoader);

    await expect(
      loader({
        request: new Request("http://localhost/"),
        params: {},
        context: {},
      }),
    ).rejects.toThrow("redirect-to-login");

    // ensure wrappedLoader was not called
    expect(wrappedLoader).not.toHaveBeenCalled();
  });
});
