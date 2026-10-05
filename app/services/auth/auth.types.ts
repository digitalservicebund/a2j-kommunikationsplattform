export enum AuthenticationProvider {
  BEA = "bea",
  KOMPLA_IDP = "kompla-idp",
}

export enum LoginType {
  BeA = "bea-login",
  KomplaIdp = "kompla-idp-login",
}

export enum LoginError {
  BeA = "bea-login-error",
  KomplaIdp = "kompla-idp-login-error",
}

export enum LogoutType {
  Automatic = "auto-logged-out",
  ByUser = "logged-out",
}

export interface AuthenticationTokens {
  accessToken: string;
  idToken?: string;
}

export interface AuthenticationResponse {
  authenticationTokens: Omit<AuthenticationTokens, "refreshToken">;
  sessionCookieHeader: string[];
  provider: AuthenticationProvider;
}
