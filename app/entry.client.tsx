/**
 * By default, React Router will handle hydrating your app on the client for you.
 * For more information, see https://reactrouter.com/explanation/special-files#entryclienttsx
 */
import * as Sentry from "@sentry/react-router";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { config } from "./config/config";

const { SENTRY_DSN } = config();

if (SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: config().SENTRY_DSN,

    // send all errors
    sampleRate: 1.0,
    // aiming for for 100 transactions/day (check sentry stats)
    tracesSampleRate: 0.002,
    // enabling this would enable automatic IP address collection on Sentry events
    sendDefaultPii: false,

    integrations: [Sentry.reactRouterTracingIntegration()],

    // set `tracePropagationTargets` to declare which URL(s) should have trace propagation enabled
    tracePropagationTargets: [/^\//, /^https:\/\/kompla\.sinc\.de\//],
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
