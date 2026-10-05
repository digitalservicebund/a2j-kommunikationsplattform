export enum AuthProvider {
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

/**
 * Details of the user's current authentication session.
 */
export interface AuthSession {
  /**
   * The authentication provider that the user logged in with.
   */
  provider: AuthProvider;
  /**
   * Access token for the KomPla API. This is always an access token from the
   * KomPla IdP, regardless of how the user logged in. (For third-party
   * providers like BRAK IdP / beA, the original tokens  exchanged for KomPla
   * IdP tokens right after login.)
   */
  accessToken: string;
  /**
   * The SAFE-ID of the user, if they have an own beA inbox (as is the case if
   * they are a lawyer, for instance).
   */
  safeId: string | null;
  /**
   * SAFE-IDs of the beA users that the user has access to. This usually
   * includes the SAFE-ID of the user themselves, unless they have a role in
   * which they exclusively act for others (such as an Rechtsanwalts- und
   * Notarfachangestellte a.k.a. ReNo).
   */
  authorizedForSafeIds: string[];
  /**
   * HTTP `Set-Cookie` values for session cookies that should be sent to the
   * client.
   */
  sessionCookieHeaders: string[];
}
