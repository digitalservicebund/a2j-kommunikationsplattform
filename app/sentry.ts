// NOTE: This module is imported by `server.js`, which is run directly through
// `node` without Vite. Therefore, we need to make sure that the import paths
// can be resolved by Node.js (include file extension, do not rely on path
// aliases defined in `tsconfig.json`).

import * as Sentry from "@sentry/react-router";
import { config } from "./config/config.ts";

function coreSentryOptions(): Sentry.BrowserOptions & Sentry.NodeOptions {
  const { ENVIRONMENT, SENTRY_DSN } = config();

  return {
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,

    // Send all errors
    sampleRate: 1.0,

    // Aim for for 100 transactions per day (check Sentry stats)
    tracesSampleRate: 0.002,

    // Disable automatic IP address collection
    sendDefaultPii: false,

    // Include the SINC KomPla API into traces
    tracePropagationTargets: [/^\//, /^https:\/\/kompla\.sinc\.de\//],
  };
}

export function initializeSentryOnServer() {
  Sentry.init(coreSentryOptions());
}

export function initializeSentryOnClient() {
  Sentry.init({
    ...coreSentryOptions(),
    integrations: [Sentry.reactRouterTracingIntegration()],
  });
}
