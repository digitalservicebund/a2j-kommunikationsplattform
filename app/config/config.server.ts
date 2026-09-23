import { existsSync, readFileSync } from "fs";
import { memoize } from "es-toolkit";
import { config } from "./config";

interface ServerConfig {
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  BRAK_IDP_OIDC_CLIENT_ID: string;
  BRAK_IDP_OIDC_CLIENT_SECRET: string;
  BRAK_IDP_OIDC_ISSUER: string;
  BRAK_IDP_OIDC_REDIRECT_URI: string;
  KOMPLA_API_URL: string;
  KOMPLA_IDP_OIDC_CLIENT_ID: string;
  KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT: string;
  KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER: string;
  KOMPLA_IDP_OIDC_CLIENT_SECRET: string;
  KOMPLA_IDP_OIDC_ISSUER: string;
  KOMPLA_MAGIC_LINK_SERVICE_CLIENT_ID: string;
  KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET: string;
  KOMPLA_MAGIC_LINK_CLIENT_ID: string;
  KOMPLA_MAGIC_LINK_REDIRECT_URI: string;
  KOMPLA_MAGIC_LINK_DEMO_USERNAME: string;
  KOMPLA_MAGIC_LINK_DEMO_EMAIL: string;
  KOMPLA_IDP_OIDC_REDIRECT_URI: string;
  SENTRY_DSN: string;
}

function isReadingSecretsFromEnvironmentAllowed() {
  return config().ENVIRONMENT === "development";
}

function configValue(
  key: string,
  options?: { secret?: boolean; default?: string },
): string {
  let value = undefined;

  // If the configuration value is a secret, try reading it from `/etc/secrets`
  // first, where we mount secrets to in the deployed version of the app.
  // Only fall back to reading secrets from the environment during local
  // development.
  if (options?.secret) {
    const secretFilePath = `/etc/secrets/${key}`;
    if (existsSync(secretFilePath)) {
      value = readFileSync(secretFilePath, "utf-8");
    } else if (isReadingSecretsFromEnvironmentAllowed()) {
      value = process.env[key];
    }
  } else {
    value = process.env[key];
  }

  return value?.trim() ?? options?.default ?? "";
}

export const serverConfig = memoize((): ServerConfig => ({
  // Better Auth
  BETTER_AUTH_SECRET: configValue("BETTER_AUTH_SECRET", { secret: true }),
  BETTER_AUTH_URL: configValue("BETTER_AUTH_URL", {
    default: "http://localhost:3000",
  }),

  // BRAK Identity Provider (beA)
  BRAK_IDP_OIDC_CLIENT_ID: configValue("BRAK_IDP_OIDC_CLIENT_ID"),
  BRAK_IDP_OIDC_CLIENT_SECRET: configValue("BRAK_IDP_OIDC_CLIENT_SECRET", {
    secret: true,
  }),
  BRAK_IDP_OIDC_ISSUER: configValue("BRAK_IDP_OIDC_ISSUER"),
  BRAK_IDP_OIDC_REDIRECT_URI: configValue("BRAK_IDP_OIDC_REDIRECT_URI"),

  // KomPla Identity Provider
  KOMPLA_API_URL: configValue("KOMPLA_API_URL"),
  KOMPLA_IDP_OIDC_CLIENT_ID: configValue("KOMPLA_IDP_OIDC_CLIENT_ID"),
  KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT: configValue(
    "KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT",
  ),
  KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER: configValue(
    "KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER",
  ),
  KOMPLA_IDP_OIDC_CLIENT_SECRET: configValue("KOMPLA_IDP_OIDC_CLIENT_SECRET", {
    secret: true,
  }),
  KOMPLA_IDP_OIDC_ISSUER: configValue("KOMPLA_IDP_OIDC_ISSUER"),

  // Magic Link Login (Guest Access)
  KOMPLA_MAGIC_LINK_SERVICE_CLIENT_ID: configValue(
    "KOMPLA_MAGIC_LINK_SERVICE_CLIENT_ID",
  ),
  KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET: configValue(
    "KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET",
    { secret: true },
  ),
  KOMPLA_MAGIC_LINK_CLIENT_ID: configValue("KOMPLA_MAGIC_LINK_CLIENT_ID"),
  KOMPLA_MAGIC_LINK_REDIRECT_URI: configValue("KOMPLA_MAGIC_LINK_REDIRECT_URI"),
  KOMPLA_MAGIC_LINK_DEMO_USERNAME: configValue(
    "KOMPLA_MAGIC_LINK_DEMO_USERNAME",
  ),
  KOMPLA_MAGIC_LINK_DEMO_EMAIL: configValue("KOMPLA_MAGIC_LINK_DEMO_EMAIL"),
  KOMPLA_IDP_OIDC_REDIRECT_URI: configValue("KOMPLA_IDP_OIDC_REDIRECT_URI"),

  // Sentry
  SENTRY_DSN: configValue("SENTRY_DSN"),
}));
