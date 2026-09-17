export enum AuthenticationProvider {
  BEA = "bea",
  DEMO = "demo",
  DEVELOPMENT = "development",
  KOMPLA_IDP = "kompla-idp",
}

export enum LoginType {
  BeA = "bea-login",
  Developer = "developer-login",
  Demo = "demo-login",
  KomplaIdp = "kompla-idp-login",
}

export enum LoginError {
  BeA = "bea-login-error",
  Demo = "demo-login-error",
  KomplaIdp = "kompla-idp-login-error",
}

export enum LogoutType {
  Automatic = "auto-logged-out",
  ByUser = "logged-out",
}

export interface AuthenticationTokens {
  accessToken: string;
  idToken?: string;
  expiresAt: number;
  refreshToken: string;
}

// Better Auth manages/rotates the OAuth2 refresh token internally and never
// exposes it, so it's optional here (only Demo/Developer logins provide one).
export interface AuthenticationResponse {
  authenticationTokens: Omit<AuthenticationTokens, "refreshToken"> & {
    refreshToken?: string;
  };
  sessionCookieHeader: string[];
  provider: AuthenticationProvider;
}
