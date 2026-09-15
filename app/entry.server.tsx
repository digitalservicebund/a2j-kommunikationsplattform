import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import * as Sentry from "@sentry/react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import {
  EntryContext,
  RouterContextProvider,
  ServerRouter,
} from "react-router";
import { config } from "~/config/config";
import { getCspHeader } from "~/services/security/cspHeader.server";
import { NonceContext } from "~/services/security/nonce";
import { generateNonce } from "~/services/security/nonce.server";
import { originFromUrlString } from "~/utils/originFromUrlString";

// =============================================================================
// NOTE: Based on the default `entry.server.tsx` as of react-router v8.3.1:
// https://github.com/remix-run/react-router/blob/%40react-router/serve%408.3.1/packages/react-router-dev/config/defaults/entry.server.node.tsx
//
// Changes are marked using comments with a `CUSTOM:` marker.
// =============================================================================

// CUSTOM: Increase `streamTimeout` to account for API response times.
export const streamTimeout = 15_000;

function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: RouterContextProvider,
) {
  return new Promise((resolve, reject) => {
    // https://httpwg.org/specs/rfc9110.html#HEAD
    // CUSTOM: Move this block here so that `handleRequest` always returns a
    // Promise. (`Sentry.wrapSentryHandleRequest(handleRequest)` results in a
    // type error otherwise.
    if (request.method.toUpperCase() === "HEAD") {
      return new Response(null, {
        status: responseStatusCode,
        headers: responseHeaders,
      });
    }

    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    let readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    let timeoutId: ReturnType<typeof setTimeout> | undefined = setTimeout(
      () => abort(),
      streamTimeout + 1000,
    );

    // CUSTOM: Generate a Content-Security-Policy (CSP) nonce and header.
    const cspNonce = generateNonce();
    const { ENVIRONMENT, SENTRY_DSN } = config();
    responseHeaders.set(
      "Content-Security-Policy",
      getCspHeader({
        nonce: cspNonce,
        environment: ENVIRONMENT,
        additionalConnectSrc: [originFromUrlString(SENTRY_DSN)].filter(
          (origin) => origin !== undefined,
        ),
      }),
    );

    const { pipe, abort } = renderToPipeableStream(
      // CUSTOM: Pass the generated CSP nonce to `ServerRouter` so that it
      // is added to all `<script>` and `<stylesheet>` tags.
      <NonceContext.Provider value={cspNonce}>
        <ServerRouter
          context={routerContext}
          url={request.url}
          nonce={cspNonce}
        />
      </NonceContext.Provider>,
      {
        // CUSTOM: Pass the CSP nonce to `renderToPipeableStream()` as well
        nonce: cspNonce,

        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              // Clear the timeout to prevent retaining the closure and memory leak
              clearTimeout(timeoutId);
              timeoutId = undefined;
              callback();
            },
          });
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          // CUSTOM: Wrap `body` using Sentry's `getMetaTagTransformer`.
          pipe(Sentry.getMetaTagTransformer(body));

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
        },

        onShellError(error: unknown) {
          reject(error);
        },

        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );
  });
}

// CUSTOM: Use `Sentry.wrapSentryHandleRequest()` from "@sentry/react-router"
// to integrate `handleRequest` with Sentry.
export default Sentry.wrapSentryHandleRequest(handleRequest);

// CUSTOM: Define a custom error handler to integrate with Sentry.
export const handleError = Sentry.createSentryHandleError({
  logErrors: true,
});

// CUSTOM: Integrate Sentry into react-router's Instrumentation API.
export const instrumentations = [Sentry.createSentryServerInstrumentation()];
