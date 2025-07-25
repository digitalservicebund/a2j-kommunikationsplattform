import { existsSync, readFileSync } from "fs";

interface ServerConfig {
  BRAK_IDP_OIDC_CLIENT_ID: string;
  BRAK_IDP_OIDC_CLIENT_SECRET: string;
  BRAK_IDP_OIDC_ISSUER: string;
  BRAK_IDP_OIDC_REDIRECT_URI: string;
  JUSTIZ_BACKEND_API_URL: string;
  FILE_UPLOAD_DIRECTORY: string;
  SENTRY_DSN: string;
}

const oidcClientSecretFilePath =
  "/etc/brak-idp-secrets/BRAK_IDP_OIDC_CLIENT_SECRET";
const oidcClientSecretFileExists = existsSync(oidcClientSecretFilePath);

export function serverConfig(): ServerConfig {
  return {
    BRAK_IDP_OIDC_CLIENT_ID: process.env.BRAK_IDP_OIDC_CLIENT_ID?.trim() ?? "",
    BRAK_IDP_OIDC_CLIENT_SECRET: oidcClientSecretFileExists
      ? readFileSync(oidcClientSecretFilePath, "utf-8")?.trim()
      : "",
    BRAK_IDP_OIDC_ISSUER: process.env.BRAK_IDP_OIDC_ISSUER?.trim() ?? "",
    BRAK_IDP_OIDC_REDIRECT_URI:
      process.env.BRAK_IDP_OIDC_REDIRECT_URI?.trim() ?? "",
    JUSTIZ_BACKEND_API_URL: process.env.JUSTIZ_BACKEND_API_URL?.trim() ?? "",
    FILE_UPLOAD_DIRECTORY: process.env.FILE_UPLOAD_DIRECTORY?.trim() ?? "/tmp",
    SENTRY_DSN: process.env.SENTRY_DSN?.trim() ?? "",
  };
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("serverConfig() returns an empty string for an undefined config item", () => {
    // save original item
    const originalEnvItem = global.process.env.SENTRY_DSN;
    delete global.process.env.SENTRY_DSN;
    const getConfig = serverConfig();
    expect(getConfig?.SENTRY_DSN).toBe("");
    // restore item
    global.process.env.SENTRY_DSN = originalEnvItem;
  });
}
