import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // @TODO: https://digitalservicebund.atlassian.net/browse/KOMMPLA-112
  //
  // 09012025: This didn't reduce any traces within Sentry dashboard, can be removed as
  // soon as another way was successful.
  //
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
});
