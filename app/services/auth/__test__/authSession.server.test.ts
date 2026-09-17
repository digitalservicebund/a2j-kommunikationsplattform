import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthenticationProvider } from "../auth.types";

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

vi.mock("../magicLinkClient.server", () => ({
  magicLinkClient: { refreshAccessToken: vi.fn() },
}));

import { getAuthData } from "../authSession.server";
import * as betterAuthModule from "../betterAuth.server";
import { magicLinkClient } from "../magicLinkClient.server";

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
const pastDate = () => new Date(Date.now() - 60_000);

function mockSession(user: Record<string, unknown> | null) {
  mocks.getSession.mockResolvedValue({
    response: user ? { session: { id: "session-1" }, user } : null,
    headers: emptyHeaders,
  });
}

describe("getAuthData", () => {
  const request = new Request("http://localhost/protected");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when there is no session", async () => {
    mockSession(null);
    const result = await getAuthData(request);
    expect(result).toBeNull();
  });

  it("returns tokens for BEA via getAccessToken, using the user's safeId as idToken", async () => {
    mockSession({
      id: "user-1",
      authProvider: AuthenticationProvider.BEA,
      safeId: "DE.BRAK_SPT.abc",
    });
    mocks.listUserAccounts.mockResolvedValue([
      {
        id: "bea-row-id-1",
        providerId: AuthenticationProvider.BEA,
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

    const result = await getAuthData(request);

    expect(mocks.getAccessToken).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { accountId: "bea-row-id-1", userId: "user-1" },
      }),
    );
    expect(result?.provider).toBe(AuthenticationProvider.BEA);
    expect(result?.authenticationTokens.accessToken).toBe("bea-access-token");
    expect(result?.authenticationTokens.idToken).toBe("DE.BRAK_SPT.abc");
  });

  it("returns tokens for KOMPLA_IDP via getAccessToken, using the user's safeId as idToken", async () => {
    mockSession({
      id: "user-2",
      authProvider: AuthenticationProvider.KOMPLA_IDP,
      safeId: "DE.KOMPLA_SPT.xyz",
    });
    mocks.listUserAccounts.mockResolvedValue([
      {
        id: "kompla-row-id-1",
        providerId: AuthenticationProvider.KOMPLA_IDP,
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

    const result = await getAuthData(request);

    expect(result?.provider).toBe(AuthenticationProvider.KOMPLA_IDP);
    expect(result?.authenticationTokens.accessToken).toBe(
      "kompla-access-token",
    );
    expect(result?.authenticationTokens.idToken).toBe("DE.KOMPLA_SPT.xyz");
  });

  it("returns tokens for DEMO directly from the account when not expired", async () => {
    mockSession({ id: "user-3", authProvider: AuthenticationProvider.DEMO });
    mocks.findAccountByUserId.mockResolvedValue([
      {
        id: "account-1",
        providerId: AuthenticationProvider.DEMO,
        accessToken: "demo-access-token",
        refreshToken: "demo-refresh-token",
        accessTokenExpiresAt: futureDate(),
      },
    ]);

    const result = await getAuthData(request);

    expect(mocks.findAccountByUserId).toHaveBeenCalledWith("user-3");
    expect(magicLinkClient.refreshAccessToken).not.toHaveBeenCalled();
    expect(result?.authenticationTokens.accessToken).toBe("demo-access-token");
  });

  it("refreshes the DEMO account when its token is expired", async () => {
    mockSession({ id: "user-4", authProvider: AuthenticationProvider.DEMO });
    mocks.findAccountByUserId.mockResolvedValue([
      {
        id: "account-2",
        providerId: AuthenticationProvider.DEMO,
        accessToken: "old-access-token",
        refreshToken: "old-refresh-token",
        accessTokenExpiresAt: pastDate(),
      },
    ]);
    vi.mocked(magicLinkClient.refreshAccessToken).mockResolvedValue({
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
      expiresAt: Date.now() + 60_000,
    });

    const result = await getAuthData(request);

    expect(magicLinkClient.refreshAccessToken).toHaveBeenCalledWith(
      "old-refresh-token",
    );
    expect(mocks.updateAccount).toHaveBeenCalledWith(
      "account-2",
      expect.objectContaining({ accessToken: "new-access-token" }),
    );
    expect(result?.authenticationTokens.accessToken).toBe("new-access-token");
  });

  it("never refreshes DEVELOPMENT accounts, even when expired", async () => {
    mockSession({
      id: "user-5",
      authProvider: AuthenticationProvider.DEVELOPMENT,
    });
    mocks.findAccountByUserId.mockResolvedValue([
      {
        id: "account-3",
        providerId: AuthenticationProvider.DEVELOPMENT,
        accessToken: "dev-access-token",
        refreshToken: "dev-refresh-token",
        accessTokenExpiresAt: pastDate(),
      },
    ]);

    const result = await getAuthData(request);

    expect(magicLinkClient.refreshAccessToken).not.toHaveBeenCalled();
    expect(result?.authenticationTokens.accessToken).toBe("dev-access-token");
  });

  it("returns null when the custom provider account has no tokens", async () => {
    mockSession({ id: "user-6", authProvider: AuthenticationProvider.DEMO });
    mocks.findAccountByUserId.mockResolvedValue([]);

    const result = await getAuthData(request);

    expect(result).toBeNull();
  });

  it("returns null instead of throwing when getAccessToken fails (e.g. expired refresh token)", async () => {
    mockSession({
      id: "user-7",
      authProvider: AuthenticationProvider.BEA,
      safeId: "DE.BRAK_SPT.abc",
    });
    mocks.listUserAccounts.mockResolvedValue([
      {
        id: "bea-row-id-2",
        providerId: AuthenticationProvider.BEA,
        accountId: "bea-provider-account-2",
      },
    ]);
    mocks.getAccessToken.mockRejectedValue(
      new Error("Failed to get a valid access token"),
    );

    await expect(getAuthData(request)).resolves.toBeNull();
  });

  it("returns null instead of throwing when refreshing an expired DEMO token fails", async () => {
    mockSession({ id: "user-8", authProvider: AuthenticationProvider.DEMO });
    mocks.findAccountByUserId.mockResolvedValue([
      {
        id: "account-4",
        providerId: AuthenticationProvider.DEMO,
        accessToken: "old-access-token",
        refreshToken: "old-refresh-token",
        accessTokenExpiresAt: pastDate(),
      },
    ]);
    vi.mocked(magicLinkClient.refreshAccessToken).mockRejectedValue(
      new Error("refresh token expired"),
    );

    await expect(getAuthData(request)).resolves.toBeNull();
    expect(mocks.updateAccount).not.toHaveBeenCalled();
  });
});
