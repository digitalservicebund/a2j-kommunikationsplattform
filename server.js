import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import pinoHttp from "pino-http";
import { RouterContextProvider } from "react-router";
import { config } from "./app/config/config.ts";
import { initializeSentryOnServer } from "./app/sentry.ts";
import { logger } from "./app/utils/logger.server.ts";

initializeSentryOnServer();

const environment = config().ENVIRONMENT;
const port = process.env.PORT || 3000;
const isProductionBuild = process.env.NODE_ENV === "production";
const isSentryEnabled = !!config().SENTRY_DSN;
const isNoindexHeaderEnabled = environment === "staging";

const viteDevServer = isProductionBuild
  ? undefined
  : await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      }),
    );

const reactRouterHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:react-router/server-build")
    : () => import("./build/server/index.js"),
  getLoadContext() {
    return new RouterContextProvider();
  },
});

const app = express();

// Trust one hop (the Traefik ingress), which terminates TLS and forwards
// plain HTTP internally. Without this, req.protocol reports "http" while
// the browser's Origin header is "https", which fails React Router's
// single-fetch CSRF origin check and returns 400 on every action request.
app.set("trust proxy", 1);

app.use(compression());
app.disable("x-powered-by");

if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", {
      immutable: true,
      maxAge: "1y",
    }),
  );
  if (isNoindexHeaderEnabled) {
    // Set noindex header for all requests to the staging environment.
    // See: https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=en#http-response-header
    app.use((_req, res, next) => {
      res.set("X-Robots-Tag", "noindex");
      next();
    });
  }
}

// Static file serving
app.use(express.static("build/client", { maxAge: "1h" }));

// Request logging
app.use(
  pinoHttp({
    logger,
    autoLogging: {
      // Do not log react-router lazy route disocvery requests
      // (https://reactrouter.com/explanation/lazy-route-discovery)
      ignore: (req) => req.url.startsWith("/__manifest"),
    },
    //
    serializers: {
      // Minimize the request and response attributes being logged to improve
      // privacy and avoid logging message bloat.
      req: (req) => ({
        method: req.method,
        url: req.url,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  }),
);

// React Router
app.all(/(.*)/, reactRouterHandler);

app.listen(port, () => {
  logger.info(
    {
      url: `http://localhost:${port}`,
      environment: config().ENVIRONMENT,
      isProductionBuild,
      isSentryEnabled,
      isNoindexHeaderEnabled,
    },
    "Server started",
  );
});
