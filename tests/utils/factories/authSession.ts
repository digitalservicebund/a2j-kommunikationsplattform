import { AuthProvider, AuthSession } from "~/services/auth/auth.types";

export function makeAuthSession(params?: Partial<AuthSession>): AuthSession {
  return {
    provider: AuthProvider.BEA,
    accessToken: "kompla-api-access-token",
    safeId: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
    authorizedForSafeIds: ["DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d"],
    sessionCookieHeaders: [],
    ...params,
  };
}
