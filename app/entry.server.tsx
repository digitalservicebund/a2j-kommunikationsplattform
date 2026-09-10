import { createReadableStreamFromReadable } from "@react-router/node";
import * as Sentry from "@sentry/react-router";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter } from "react-router";

export const handleError = Sentry.createSentryHandleError({
  logErrors: true,
});

const handleRequest = Sentry.createSentryHandleRequest({
  ServerRouter,
  renderToPipeableStream,
  createReadableStreamFromReadable,
  // Increased stream timeout to handle token refresh (which happens on expired
  // cookies) + multiple API calls without causing stream timeouts that result
  // in 502 errors
  streamTimeout: 15_000,
});

export default handleRequest;
