import { describe, expect, it, vi } from "vitest";
import { AuthenticationProvider } from "../auth.types";
import { makeGetUserInfo } from "../betterAuth.server";

// Mock the `betterAuth()` function as otherwise it attempts to fetch from the
// OpenID Connect discovery URLs to resolve the authorization and token
// endpoints.
vi.mock("better-auth", () => ({
  betterAuth: () => {},
}));

function makeIdToken(claims: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none" })).toString(
    "base64url",
  );
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${header}.${payload}.sig`;
}

describe("makeGetUserInfo", () => {
  it("returns user info from the ID token", async () => {
    const idToken = makeIdToken({
      sub: "user-123",
      email: "user-123@example.com",
      name: "Voller Name",
      "safe-id": "DE.BRAK_SPT.abc-123",
    });

    const getUserInfo = makeGetUserInfo(AuthenticationProvider.BEA);
    const userInfo = await getUserInfo({ idToken });

    expect(userInfo).toEqual({
      sub: "user-123",
      email: "user-123@example.com",
      emailVerified: false,
      name: "Voller Name",
      "safe-id": "DE.BRAK_SPT.abc-123",
    });
  });

  it("synthesizes an email address if there is no 'email' claim", async () => {
    const idToken = makeIdToken({
      sub: "user-123",
      "safe-id": "DE.BRAK_SPT.abc-123",
    });

    const getUserInfo = makeGetUserInfo(AuthenticationProvider.BEA);
    const userInfo = await getUserInfo({ idToken });

    expect(userInfo).toMatchObject({
      email: "bea-DE.BRAK_SPT.abc-123@no-email.kompla-justiz.internal",
    });
  });

  it("falls back to the sub claim when safe-id is absent", async () => {
    const idToken = makeIdToken({ sub: "user-sub-456" });

    const getUserInfo = makeGetUserInfo(AuthenticationProvider.KOMPLA_IDP);
    const userInfo = await getUserInfo({ idToken });

    expect(userInfo).toBeDefined();
    expect(userInfo!.sub).toBe("user-sub-456");
    expect(userInfo!.email).toBe(
      "kompla-idp-user-sub-456@no-email.kompla-justiz.internal",
    );
  });

  it("returns null if there is no ID token", async () => {
    const getUserInfo = makeGetUserInfo(AuthenticationProvider.BEA);
    const userInfo = await getUserInfo({});

    expect(userInfo).toBeNull();
  });
});
