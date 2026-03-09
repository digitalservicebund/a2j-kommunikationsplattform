import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { AuthenticationProvider } from "~/services/auth/oAuth.server";

export const mockAuthData: AuthenticationResponse = {
  authenticationTokens: {
    accessToken: "user-access-token",
    expiresAt: Date.now() + 60_000,
    refreshToken: "refresh-token",
  },
  sessionCookieHeader: "",
  provider: AuthenticationProvider.BEA,
};
