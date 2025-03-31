/**
 * By default, React Router will handle hydrating your app on the client for you.
 * For more information, see https://reactrouter.com/explanation/special-files#entryclienttsx
 */
import * as Sentry from "@sentry/react-router";
import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { clientConfig } from "./config/config";

const { SENTRY_DSN } = clientConfig();

if (SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: clientConfig().SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration()],

    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    tracePropagationTargets: [
      /^\//, //  This enables trace propagation for all relative paths on the same domain.
      /^https:\/\/kompla\.sinc\.de\//,
    ],
  });
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
