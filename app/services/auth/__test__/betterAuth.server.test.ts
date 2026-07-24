import { describe, expect, it } from "vitest";
import { AuthenticationProvider } from "../auth.types";
import { getUserInfoFromIdToken } from "../betterAuth.server";

function makeIdToken(claims: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none" })).toString(
    "base64url",
  );
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${header}.${payload}.sig`;
}

describe("getUserInfoFromIdToken", () => {
  it("derives a synthetic, provider-scoped user from the safe-id claim", async () => {
    const idToken = makeIdToken({ "safe-id": "DE.BRAK_SPT.abc-123" });
    const getUserInfo = getUserInfoFromIdToken(
      AuthenticationProvider.BEA,
      "fallback-id",
    );

    const userInfo = await getUserInfo({ idToken });

    expect(userInfo).toEqual({
      id: "DE.BRAK_SPT.abc-123",
      email: "bea-DE.BRAK_SPT.abc-123@no-email.kompla-justiz.internal",
      emailVerified: false,
      name: "DE.BRAK_SPT.abc-123",
    });
  });

  it("falls back to the sub claim when safe-id is absent", async () => {
    const idToken = makeIdToken({ sub: "user-sub-456" });
    const getUserInfo = getUserInfoFromIdToken(
      AuthenticationProvider.KOMPLA_IDP,
      "fallback-id",
    );

    const userInfo = await getUserInfo({ idToken });

    expect(userInfo.id).toBe("user-sub-456");
    expect(userInfo.email).toBe(
      "kompla-idp-user-sub-456@no-email.kompla-justiz.internal",
    );
  });

  it("falls back to the given fallbackId when there is no idToken", async () => {
    const getUserInfo = getUserInfoFromIdToken(
      AuthenticationProvider.BEA,
      "bea-user",
    );

    const userInfo = await getUserInfo({});

    expect(userInfo.id).toBe("bea-user");
  });
});
