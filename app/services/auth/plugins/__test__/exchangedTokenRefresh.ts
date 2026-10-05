import { describe, expect, it, vi } from "vitest";
import { AuthenticationProvider } from "../../auth.types";
import { exchangedTokenRefreshPlugin } from "../exchangedTokenRefresh.server";

type Provider = { id: string; refreshAccessToken?: unknown };
type InitContext = Parameters<
  ReturnType<typeof exchangedTokenRefreshPlugin>["init"]
>[0];

function runInit(socialProviders: Provider[]) {
  return exchangedTokenRefreshPlugin().init({
    socialProviders,
  } as unknown as InitContext);
}

describe("exchangedTokenRefreshPlugin", () => {
  it("replaces the non-KomPla providers' refreshAccessToken with the KomPla IdP one", () => {
    const komplaRefresh = vi.fn();

    const kompla = {
      id: AuthenticationProvider.KOMPLA_IDP,
      refreshAccessToken: komplaRefresh,
    };
    const bea = {
      id: AuthenticationProvider.BEA,
      refreshAccessToken: vi.fn(),
    };
    const other = {
      id: "other",
      refreshAccessToken: vi.fn(),
    };

    const { context } = runInit([kompla, bea, other]);

    expect(context.socialProviders).toEqual([
      kompla,
      { ...bea, refreshAccessToken: komplaRefresh },
      { ...other, refreshAccessToken: komplaRefresh },
    ]);
  });

  it("throws if the KomPla IdP provider is not registered", () => {
    expect(() =>
      runInit([
        { id: AuthenticationProvider.BEA, refreshAccessToken: vi.fn() },
      ]),
    ).toThrow(/kompla-idp/);
  });
});
