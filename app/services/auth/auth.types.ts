export enum AuthenticationProvider {
  BEA = "bea",
  DEMO = "demo",
  DEVELOPMENT = "development",
}

export interface AuthenticationTokens {
  accessToken: string;
  idToken?: string;
  expiresAt: number;
  refreshToken: string;
}

export interface AuthenticationResponse {
  authenticationTokens: AuthenticationTokens;
  sessionCookieHeader: string;
  provider: AuthenticationProvider;
}
