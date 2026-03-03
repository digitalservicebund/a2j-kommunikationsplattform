import { Strategy } from "remix-auth/strategy";
import type {
  AuthenticationResponse,
  AuthenticationTokens,
} from "./auth.types";

export interface MagicLinkVerifyOptions {
  tokens: AuthenticationTokens;
  request: Request;
}

interface MagicLinkConfig {
  idpIssuer: string; // base URL, e.g. https://auth.kompla-justiz.sinc.de/realms/kompla-dev
  serviceClientId: string; // client for client_credentials grant, e.g. magic-link-service
  serviceClientSecret: string;
  clientId: string; // client_id sent in magic link body, e.g. magic-link
  redirectUri: string; // must be registered in Keycloak and match APP_URL/auth/magic-link-callback
  username: string;
  email: string;
}

export class MagicLinkStrategy extends Strategy<
  AuthenticationResponse,
  MagicLinkVerifyOptions
> {
  name = "magic-link";
  private config: MagicLinkConfig;

  constructor(
    config: MagicLinkConfig,
    verify: Strategy.VerifyFunction<
      AuthenticationResponse,
      MagicLinkVerifyOptions
    >,
  ) {
    super(verify);
    this.config = config;
  }

  /**
   * Phase 1 — called from the action to obtain the magic link URL.
   * The caller is responsible for returning it to the browser so it can
   * navigate there (e.g. via window.location.href).
   */
  async getMagicLinkUrl(): Promise<string> {
    this.assertConfig();
    console.log("MagicLinkStrategy: phase 1 — requesting magic link");
    const serviceToken = await this.requestServiceToken();
    return this.requestMagicLink(serviceToken);
  }

  /**
   * Phase 2 — called from the callback loader once Keycloak has redirected
   * the browser back with ?code=. Exchanges the code for tokens.
   */
  async authenticate(request: Request): Promise<AuthenticationResponse> {
    this.assertConfig();

    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      throw new Error(
        "MagicLinkStrategy: no auth code in request URL. " +
          "Use getMagicLinkUrl() for phase 1.",
      );
    }

    console.log("MagicLinkStrategy: phase 2 — exchanging auth code for tokens");
    const tokens = await this.exchangeCodeForTokens(code);
    return this.verify({ tokens, request });
  }

  private assertConfig() {
    const missing = (
      [
        "idpIssuer",
        "serviceClientId",
        "serviceClientSecret",
        "clientId",
        "redirectUri",
        "username",
        "email",
      ] as const
    ).filter((key) => !this.config[key]);

    if (missing.length > 0) {
      const envVarNames = missing
        .map((k) => `KOMPLA_DEMO_${k.replace(/([A-Z])/g, "_$1").toUpperCase()}`)
        .join(", ");
      throw new Error(
        `MagicLinkStrategy: missing required env vars: ${envVarNames}`,
      );
    }
  }

  /**
   * Step 1 — Obtain a short-lived service token via the OAuth2
   * client_credentials grant. Used as Authorization Bearer for the magic
   * link endpoint.
   */
  private async requestServiceToken(): Promise<string> {
    const tokenEndpoint = `${this.config.idpIssuer}/protocol/openid-connect/token`;

    console.log(
      "MagicLinkStrategy: requesting service token from",
      tokenEndpoint,
    );

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.config.serviceClientId,
      client_secret: this.config.serviceClientSecret,
    });

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      throw new Error(
        `Service token request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as Record<string, unknown>;
    console.log("MagicLinkStrategy: service token obtained");
    return data["access_token"] as string;
  }

  /**
   * Step 2 — POST to the magic link endpoint with the service Bearer token.
   * Returns the magic link URL string.
   */
  private async requestMagicLink(serviceToken: string): Promise<string> {
    const magicLinkEndpoint = `${this.config.idpIssuer}/magic-link`;

    console.log(
      "MagicLinkStrategy: requesting magic link from",
      magicLinkEndpoint,
    );

    const response = await fetch(magicLinkEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceToken}`,
      },
      body: JSON.stringify({
        username: this.config.username,
        email: this.config.email,
        client_id: this.config.clientId,
        redirect_uri: this.config.redirectUri,
        expiration_seconds: 600,
        send_email: false,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Magic link request failed: ${response.status} ${response.statusText}`,
      );
    }

    // The response is the magic link — either JSON {link: "..."} or plain text URL
    const contentType = response.headers.get("content-type") ?? "";

    // JSON response with { link: "..." }
    if (contentType.includes("application/json")) {
      const data = (await response.json()) as Record<string, unknown>;

      if (typeof data["link"] === "string") {
        console.log("MagicLinkStrategy: magic link obtained (JSON)");
        return data["link"];
      }

      throw new Error(
        `Unexpected magic link JSON response: ${JSON.stringify(data)}`,
      );
    }

    // Plain text URL
    const link = (await response.text()).trim();
    console.log("MagicLinkStrategy: magic link obtained (plain text)");
    return link;
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<AuthenticationTokens> {
    const tokenEndpoint = `${this.config.idpIssuer}/protocol/openid-connect/token`;

    console.log("MagicLinkStrategy: refreshing access token");

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: this.config.clientId,
    });

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Demo token refresh failed: ${response.status} — ${text}`,
      );
    }

    const data = (await response.json()) as Record<string, unknown>;
    return this.parseTokenResponse(data, refreshToken);
  }

  private async exchangeCodeForTokens(
    code: string,
  ): Promise<AuthenticationTokens> {
    const tokenEndpoint = `${this.config.idpIssuer}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
    });

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Token exchange failed: ${response.status} — ${text}`);
    }

    const data = (await response.json()) as Record<string, unknown>;
    return this.parseTokenResponse(data);
  }

  private parseTokenResponse(
    data: Record<string, unknown>,
    fallbackRefreshToken?: string,
  ): AuthenticationTokens {
    const accessToken = data["access_token"] as string;
    const refreshToken =
      (data["refresh_token"] as string) || fallbackRefreshToken || "";
    const expiresIn = (data["expires_in"] as number) ?? 300;
    return {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
    };
  }
}
