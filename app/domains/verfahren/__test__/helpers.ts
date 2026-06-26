import { AuthenticationResponse } from "~/services/auth/auth.types";
import { AuthenticationProvider } from "~/services/auth/oAuth.server";

export const mockAuthData: AuthenticationResponse = {
  authenticationTokens: {
    accessToken: "user-access-token",
    idToken: "user-id-token",
    expiresAt: Date.now() + 60_000,
    refreshToken: "refresh-token",
  },
  sessionCookieHeader: "",
  provider: AuthenticationProvider.BEA,
};
