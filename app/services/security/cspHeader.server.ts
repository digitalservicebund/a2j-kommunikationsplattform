import { serverConfig } from "~/config/config.server";

export const getCspHeader = (args: {
  nonce: string;
  environment: string;
  additionalConnectSrc?: string[];
}) => {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "https:",
      `'nonce-${args.nonce}'`,
      "'strict-dynamic'",
      "eu-assets.i.posthog.com", // see https://posthog.com/docs/session-replay/troubleshooting#3-content-security-policy
    ],
    "frame-src": ["www.youtube-nocookie.com"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "font-src": ["'self'"],
    "connect-src": [
      "'self'",
      "openplzapi.org",
      "eu.i.posthog.com",
      serverConfig().JUSTIZ_BACKEND_API_URL,
      ...(args.additionalConnectSrc ?? []),
    ],
    "img-src": [
      "'self'",
      serverConfig().JUSTIZ_BACKEND_API_URL,
      "https://mermaid.ink",
      "https://img.youtube.com",
      "data:",
    ],
    "form-action": [
      "'self'",
      "https://int.id.bund.de/idp/profile/SAML2/POST/SSO",
    ],
    "object-src": ["'none'"],
    "base-uri": ["'none'"],
    "frame-ancestors": ["'none'"],
    "upgrade-insecure-requests": [],
  };

  if (args.environment === "development") {
    directives["connect-src"].push("ws://localhost:24678"); // vite's HMR server
    directives["connect-src"].push("http://localhost:24678"); // vite's HMR server
    directives["img-src"].push("localhost:*");
    delete directives["upgrade-insecure-requests"]; // https://github.com/github/secure_headers/issues/348
  }

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join(";");
};
