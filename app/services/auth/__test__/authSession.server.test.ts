import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "../auth.types";

vi.mock("../betterAuth.server", () => {
  const getSession = vi.fn();
  const getAccessToken = vi.fn();
  const listUserAccounts = vi.fn();
  const findAccountByUserId = vi.fn();
  const updateAccount = vi.fn();

  return {
    auth: {
      api: { getSession, getAccessToken, listUserAccounts },
      $context: Promise.resolve({
        internalAdapter: { findAccountByUserId, updateAccount },
      }),
    },
    __mocks__: {
      getSession,
      getAccessToken,
      listUserAccounts,
      findAccountByUserId,
      updateAccount,
    },
  };
});

import { getAuthSession } from "../authSession.server";
import * as betterAuthModule from "../betterAuth.server";

const mocks = (
  betterAuthModule as unknown as {
    __mocks__: {
      getSession: ReturnType<typeof vi.fn>;
      getAccessToken: ReturnType<typeof vi.fn>;
      listUserAccounts: ReturnType<typeof vi.fn>;
      findAccountByUserId: ReturnType<typeof vi.fn>;
      updateAccount: ReturnType<typeof vi.fn>;
    };
  }
).__mocks__;

const emptyHeaders = { getSetCookie: () => [] };
const futureDate = () => new Date(Date.now() + 60_000);

function mockSession(user: Record<string, unknown> | null) {
  mocks.getSession.mockResolvedValue({
    response: user ? { session: { id: "session-1" }, user } : null,
    headers: emptyHeaders,
  });
}

describe("getAuthSession", () => {
  const request = new Request("http://localhost/protected");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when there is no session", async () => {
    mockSession(null);
    const result = await getAuthSession(request);
    expect(result).toBeNull();
  });

  it("returns tokens for BEA via getAccessToken, using the user's safeId as idToken", async () => {
    mockSession({
      id: "user-1",
      authProvider: AuthProvider.BEA,
      safeId: "DE.BRAK_SPT.abc",
    });
    mocks.listUserAccounts.mockResolvedValue([
      {
        id: "bea-row-id-1",
        providerId: AuthProvider.BEA,
        accountId: "bea-provider-account-1",
      },
    ]);
    mocks.getAccessToken.mockResolvedValue({
      response: {
        accessToken: "bea-access-token",
        accessTokenExpiresAt: futureDate(),
      },
      headers: emptyHeaders,
    });

    const result = await getAuthSession(request);

    expect(mocks.getAccessToken).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { accountId: "bea-row-id-1", userId: "user-1" },
      }),
    );
    expect(result?.provider).toBe(AuthProvider.BEA);
    expect(result?.accessToken).toBe("bea-access-token");
    expect(result?.safeId).toBe("DE.BRAK_SPT.abc");
  });

  it("returns tokens for KOMPLA_IDP via getAccessToken, using the user's safeId as idToken", async () => {
    mockSession({
      id: "user-2",
      authProvider: AuthProvider.KOMPLA_IDP,
      safeId: "DE.KOMPLA_SPT.xyz",
    });
    mocks.listUserAccounts.mockResolvedValue([
      {
        id: "kompla-row-id-1",
        providerId: AuthProvider.KOMPLA_IDP,
        accountId: "kompla-provider-account-1",
      },
    ]);
    mocks.getAccessToken.mockResolvedValue({
      response: {
        accessToken: "kompla-access-token",
        accessTokenExpiresAt: futureDate(),
      },
      headers: emptyHeaders,
    });

    const result = await getAuthSession(request);

    expect(result?.provider).toBe(AuthProvider.KOMPLA_IDP);
    expect(result?.accessToken).toBe("kompla-access-token");
    expect(result?.safeId).toBe("DE.KOMPLA_SPT.xyz");
  });

  it("returns null instead of throwing when getAccessToken fails (e.g. expired refresh token)", async () => {
    mockSession({
      id: "user-7",
      authProvider: AuthProvider.BEA,
      safeId: "DE.BRAK_SPT.abc",
    });
    mocks.listUserAccounts.mockResolvedValue([
      {
        id: "bea-row-id-2",
        providerId: AuthProvider.BEA,
        accountId: "bea-provider-account-2",
      },
    ]);
    mocks.getAccessToken.mockRejectedValue(
      new Error("Failed to get a valid access token"),
    );

    await expect(getAuthSession(request)).resolves.toBeNull();
  });
});
