import { existsSync, readFileSync } from "fs";

interface ServerConfig {
  BRAK_IDP_OIDC_CLIENT_ID: string;
  BRAK_IDP_OIDC_CLIENT_SECRET: string;
  BRAK_IDP_OIDC_ISSUER: string;
  BRAK_IDP_OIDC_REDIRECT_URI: string;
  JUSTIZ_BACKEND_API_URL: string;
  FILE_UPLOAD_DIRECTORY: string;
  SENTRY_DSN: string;
  ENVIRONMENT: string;
}

let instance: ServerConfig | undefined = undefined;

const oidcClientSecretFilePath =
  "/etc/brak-idp-secrets/BRAK_IDP_OIDC_CLIENT_SECRET";
const oidcClientSecretFileExists = existsSync(oidcClientSecretFilePath);

export function serverConfig(): ServerConfig {
  if (instance === undefined) {
    instance = {
      BRAK_IDP_OIDC_CLIENT_ID:
        process.env.BRAK_IDP_OIDC_CLIENT_ID?.trim() ?? "",
      BRAK_IDP_OIDC_CLIENT_SECRET: oidcClientSecretFileExists
        ? readFileSync(oidcClientSecretFilePath, "utf-8")?.trim()
        : "",
      BRAK_IDP_OIDC_ISSUER: process.env.BRAK_IDP_OIDC_ISSUER?.trim() ?? "",
      BRAK_IDP_OIDC_REDIRECT_URI:
        process.env.BRAK_IDP_OIDC_REDIRECT_URI?.trim() ?? "",
      JUSTIZ_BACKEND_API_URL: process.env.JUSTIZ_BACKEND_API_URL?.trim() ?? "",
      FILE_UPLOAD_DIRECTORY:
        process.env.FILE_UPLOAD_DIRECTORY?.trim() ?? "/tmp",
      SENTRY_DSN: process.env.SENTRY_DSN?.trim() ?? "",
      ENVIRONMENT: process.env.ENVIRONMENT?.trim() ?? "",
    };
  }

  return instance;
}
