import {
  AuthenticationProvider,
  AuthenticationResponse,
} from "~/services/auth/auth.types";

export const mockAuthData: AuthenticationResponse = {
  authenticationTokens: {
    accessToken: "user-access-token",
    idToken: "user-id-token",
  },
  sessionCookieHeader: [],
  provider: AuthenticationProvider.BEA,
};
