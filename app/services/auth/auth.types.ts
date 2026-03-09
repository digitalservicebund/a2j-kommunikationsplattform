export enum AuthenticationProvider {
  BEA = "bea",
  DEMO = "demo",
  DEVELOPMENT = "development",
}

export interface AuthenticationTokens {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
}

export interface AuthenticationResponse {
  authenticationTokens: AuthenticationTokens;
  sessionCookieHeader: string;
  provider: AuthenticationProvider;
}
