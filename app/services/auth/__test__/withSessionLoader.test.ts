import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/services/auth/session.server", () => ({
  requireUserSession: vi.fn(),
}));

import { LoaderFunctionArgs } from "react-router";
import { AuthenticationContext } from "~/services/auth/oAuth.server";
import { requireUserSession } from "~/services/auth/session.server";
import { withSessionLoader } from "~/services/auth/withSessionLoader";

const requestURL = "http://localhost/with-session-loader-test";
const accessToken = "test-access-token-with-session-loader";

describe("withSessionLoader", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("calls wrapped loader with userSession and returns its result", async () => {
    const mockSession = {
      accessToken: accessToken,
      expiresAt: Date.now() + 1000,
    };
    (requireUserSession as unknown as Mock).mockResolvedValue(mockSession);

    const wrappedLoader = vi.fn(
      async (
        args: LoaderFunctionArgs & { userSession: AuthenticationContext },
      ) => {
        return { ok: true, sessionToken: args.userSession?.accessToken };
      },
    );

    const loader = withSessionLoader(wrappedLoader);

    const result = await loader({
      request: new Request(requestURL),
      params: {},
      context: {},
    });

    expect(wrappedLoader).toHaveBeenCalled();
    expect(result).toEqual({ ok: true, sessionToken: accessToken });
  });

  it("propagates error (redirect) thrown by requireUserSession", async () => {
    const thrown = new Error("redirect-to-login");
    (requireUserSession as unknown as Mock).mockRejectedValue(thrown);

    const wrappedLoader = vi.fn(async () => ({ ok: true }));
    const loader = withSessionLoader(wrappedLoader);

    await expect(
      loader({
        request: new Request(requestURL),
        params: {},
        context: {},
      }),
    ).rejects.toThrow("redirect-to-login");
    expect(wrappedLoader).not.toHaveBeenCalled();
  });
});
