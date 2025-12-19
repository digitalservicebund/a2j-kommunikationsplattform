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
      "'strict-dynamic'", // allows/favors hashes & nonces over domain host lists
    ],
    "frame-src": ["'self'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "font-src": ["'self'"],
    "connect-src": [
      "'self'",
      serverConfig().KOMPLA_API_URL,
      serverConfig().BRAK_IDP_OIDC_ISSUER,
      ...(args.additionalConnectSrc ?? []),
    ],
    "img-src": ["'self'", serverConfig().KOMPLA_API_URL, "data:"],
    "form-action": ["'self'"],
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
