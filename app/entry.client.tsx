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

// @TODO: clean up https://digitalservicebund.atlassian.net/browse/KOMMPLA-112
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

    /*
    // Can be added, if necessary, docs:
    // https://docs.sentry.io/platforms/javascript/tracing/configure-sampling/#sampling-function-tracessampler
    // Capture 0 percent of transactions originating from kube-probe, e.g. /readyz calls by K8s
    tracesSampler: (samplingContext) => {
      const userAgent =
        samplingContext.request?.headers["user-agent"] ||
        samplingContext.request?.headers["User-Agent"];
      // Exclude traces if user agent is kube-probe
      if (userAgent && userAgent.includes("kube-probe")) {
        return 0.0;
      }
      // Default sample rate for all other traces
      return 0.1; // Capture 10% of the transactions
    },
    */

    // Set `tracePropagationTargets` to declare which URL(s) should have trace propagation enabled
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
