import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthenticationProvider } from "../auth.types";

vi.mock("../betterAuth.server", () => {
  const getSession = vi.fn();
  const getAccessToken = vi.fn();
  const findAccountByProviderId = vi.fn();
  const updateAccount = vi.fn();

  return {
    auth: {
      api: { getSession, getAccessToken },
      $context: Promise.resolve({
        internalAdapter: { findAccountByProviderId, updateAccount },
      }),
    },
    __mocks__: {
      getSession,
      getAccessToken,
      findAccountByProviderId,
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
      findAccountByProviderId: ReturnType<typeof vi.fn>;
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
        body: { providerId: AuthenticationProvider.BEA },
      }),
    );
    expect(result?.provider).toBe(AuthenticationProvider.BEA);
    expect(result?.authenticationTokens.accessToken).toBe("bea-access-token");
    expect(result?.authenticationTokens.idToken).toBe("DE.BRAK_SPT.abc");
  });

  it("returns tokens for KOMPLA_IDP via getAccessToken", async () => {
    mockSession({
      id: "user-2",
      authProvider: AuthenticationProvider.KOMPLA_IDP,
    });
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
  });

  it("returns tokens for DEMO directly from the account when not expired", async () => {
    mockSession({ id: "user-3", authProvider: AuthenticationProvider.DEMO });
    mocks.findAccountByProviderId.mockResolvedValue({
      id: "account-1",
      accessToken: "demo-access-token",
      refreshToken: "demo-refresh-token",
      accessTokenExpiresAt: futureDate(),
    });

    const result = await getAuthData(request);

    expect(mocks.findAccountByProviderId).toHaveBeenCalledWith(
      "user-3",
      AuthenticationProvider.DEMO,
    );
    expect(magicLinkClient.refreshAccessToken).not.toHaveBeenCalled();
    expect(result?.authenticationTokens.accessToken).toBe("demo-access-token");
  });

  it("refreshes the DEMO account when its token is expired", async () => {
    mockSession({ id: "user-4", authProvider: AuthenticationProvider.DEMO });
    mocks.findAccountByProviderId.mockResolvedValue({
      id: "account-2",
      accessToken: "old-access-token",
      refreshToken: "old-refresh-token",
      accessTokenExpiresAt: pastDate(),
    });
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
    mocks.findAccountByProviderId.mockResolvedValue({
      id: "account-3",
      accessToken: "dev-access-token",
      refreshToken: "dev-refresh-token",
      accessTokenExpiresAt: pastDate(),
    });

    const result = await getAuthData(request);

    expect(magicLinkClient.refreshAccessToken).not.toHaveBeenCalled();
    expect(result?.authenticationTokens.accessToken).toBe("dev-access-token");
  });

  it("returns null when the custom provider account has no tokens", async () => {
    mockSession({ id: "user-6", authProvider: AuthenticationProvider.DEMO });
    mocks.findAccountByProviderId.mockResolvedValue(null);

    const result = await getAuthData(request);

    expect(result).toBeNull();
  });
});
