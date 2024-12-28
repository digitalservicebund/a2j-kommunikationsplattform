import { readFileSync, existsSync } from "fs";

interface Config {
  BASE_URL: string;
  BRAK_IDP_OIDC_CLIENT_ID: string;
  BRAK_IDP_OIDC_CLIENT_SECRET: string;
  BRAK_IDP_OIDC_ISSUER: string;
  BRAK_IDP_OIDC_REDIRECT_URI: string;
}

let instance: Config | undefined = undefined;

const oidcClientSecretFilePath =
  "/etc/brak-idp-secrets/BRAK_IDP_OIDC_CLIENT_SECRET";
const oidcClientSecretFileExists = existsSync(oidcClientSecretFilePath);

export function config(): Config {
  if (instance === undefined) {
    instance = {
      BASE_URL: process.env.BASE_URL?.trim() ?? "",
      BRAK_IDP_OIDC_CLIENT_ID:
        process.env.BRAK_IDP_OIDC_CLIENT_ID?.trim() ?? "",
      BRAK_IDP_OIDC_CLIENT_SECRET: oidcClientSecretFileExists
        ? readFileSync(oidcClientSecretFilePath, "utf-8")?.trim()
        : "",
      BRAK_IDP_OIDC_ISSUER: process.env.BRAK_IDP_OIDC_ISSUER?.trim() ?? "",
      BRAK_IDP_OIDC_REDIRECT_URI:
        process.env.BRAK_IDP_OIDC_REDIRECT_URI?.trim() ?? "",
    };
  }

  return instance;
}
