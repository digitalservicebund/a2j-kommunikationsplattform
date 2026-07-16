import { existsSync, readFileSync } from "fs";
import { config } from "./config";

interface ServerConfig {
  BRAK_IDP_OIDC_CLIENT_ID: string;
  BRAK_IDP_OIDC_CLIENT_SECRET: string;
  BRAK_IDP_OIDC_ISSUER: string;
  BRAK_IDP_OIDC_REDIRECT_URI: string;
  KOMPLA_API_URL: string;
  KOMPLA_API_IDP_CLIENT_ID: string;
  KOMPLA_API_IDP_ISSUER: string;
  KOMPLA_API_IDP_SUBJECT_ISSUER: string;
  KOMPLA_API_IDP_CLIENT_SECRET: string;
  KOMPLA_DEMO_IDP_ISSUER: string;
  KOMPLA_DEMO_SERVICE_CLIENT_ID: string;
  KOMPLA_DEMO_SERVICE_CLIENT_SECRET: string;
  KOMPLA_DEMO_CLIENT_ID: string;
  KOMPLA_DEMO_REDIRECT_URI: string;
  KOMPLA_DEMO_USERNAME: string;
  KOMPLA_DEMO_EMAIL: string;
  KOMPLA_API_IDP_REDIRECT_URI: string;
  SENTRY_DSN: string;
}

const brakOidcClientSecretFilePath = "/etc/secrets/BRAK_IDP_OIDC_CLIENT_SECRET";
const brakOidcClientSecretFileExists = existsSync(brakOidcClientSecretFilePath);
let brakOidcClientSecretFallback = "";
if (config().ENVIRONMENT === "development") {
  brakOidcClientSecretFallback =
    process.env.BRAK_IDP_OIDC_CLIENT_SECRET?.trim() ?? "";
}

const demoServiceClientSecretFilePath =
  "/etc/secrets/KOMPLA_DEMO_SERVICE_CLIENT_SECRET";
const demoServiceClientSecretFileExists = existsSync(
  demoServiceClientSecretFilePath,
);
let demoServiceClientSecretFallback = "";
if (config().ENVIRONMENT === "development") {
  demoServiceClientSecretFallback =
    process.env.KOMPLA_DEMO_SERVICE_CLIENT_SECRET?.trim() ?? "";
}

const apiIdpClientSecretFilePath = "/etc/secrets/KOMPLA_API_IDP_CLIENT_SECRET";
const apiIdpClientSecretFileExists = existsSync(apiIdpClientSecretFilePath);
let apiIdpClientSecretFallback = "";
if (config().ENVIRONMENT === "development") {
  apiIdpClientSecretFallback =
    process.env.KOMPLA_API_IDP_CLIENT_SECRET?.trim() ?? "";
}

export function serverConfig(): ServerConfig {
  return {
    BRAK_IDP_OIDC_CLIENT_ID: process.env.BRAK_IDP_OIDC_CLIENT_ID?.trim() ?? "",
    BRAK_IDP_OIDC_CLIENT_SECRET: brakOidcClientSecretFileExists
      ? readFileSync(brakOidcClientSecretFilePath, "utf-8")?.trim()
      : brakOidcClientSecretFallback,
    BRAK_IDP_OIDC_ISSUER: process.env.BRAK_IDP_OIDC_ISSUER?.trim() ?? "",
    BRAK_IDP_OIDC_REDIRECT_URI:
      process.env.BRAK_IDP_OIDC_REDIRECT_URI?.trim() ?? "",
    KOMPLA_API_URL: process.env.KOMPLA_API_URL?.trim() ?? "",
    KOMPLA_API_IDP_CLIENT_ID:
      process.env.KOMPLA_API_IDP_CLIENT_ID?.trim() ?? "",
    KOMPLA_API_IDP_ISSUER: process.env.KOMPLA_API_IDP_ISSUER?.trim() ?? "",
    KOMPLA_API_IDP_SUBJECT_ISSUER:
      process.env.KOMPLA_API_IDP_SUBJECT_ISSUER?.trim() ?? "",
    KOMPLA_API_IDP_CLIENT_SECRET: apiIdpClientSecretFileExists
      ? readFileSync(apiIdpClientSecretFilePath, "utf-8")?.trim()
      : apiIdpClientSecretFallback,
    KOMPLA_DEMO_IDP_ISSUER: process.env.KOMPLA_DEMO_IDP_ISSUER?.trim() ?? "",
    KOMPLA_DEMO_SERVICE_CLIENT_ID:
      process.env.KOMPLA_DEMO_SERVICE_CLIENT_ID?.trim() ?? "",
    KOMPLA_DEMO_SERVICE_CLIENT_SECRET: demoServiceClientSecretFileExists
      ? readFileSync(demoServiceClientSecretFilePath, "utf-8")?.trim()
      : demoServiceClientSecretFallback,
    KOMPLA_DEMO_CLIENT_ID: process.env.KOMPLA_DEMO_CLIENT_ID?.trim() ?? "",
    KOMPLA_DEMO_REDIRECT_URI:
      process.env.KOMPLA_DEMO_REDIRECT_URI?.trim() ?? "",
    KOMPLA_DEMO_USERNAME: process.env.KOMPLA_DEMO_USERNAME?.trim() ?? "",
    KOMPLA_DEMO_EMAIL: process.env.KOMPLA_DEMO_EMAIL?.trim() ?? "",
    KOMPLA_API_IDP_REDIRECT_URI:
      process.env.KOMPLA_API_IDP_REDIRECT_URI?.trim() ?? "",
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
