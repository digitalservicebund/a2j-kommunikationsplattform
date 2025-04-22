import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  tracePropagationTargets: [
    /^(?!\/\.well-known\/health$).*$/, // Exclude /.well-known/health
    /^\//, // This enables trace propagation for all relative paths on the same domain.
    /^https:\/\/kompla\.sinc\.de\//,
  ],
});
