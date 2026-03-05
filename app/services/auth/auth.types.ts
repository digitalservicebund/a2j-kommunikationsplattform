export interface AuthenticationTokens {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
}

export interface AuthenticationResponse {
  authenticationTokens: AuthenticationTokens;
  sessionCookieHeader: string;
  isDemo?: boolean;
}
