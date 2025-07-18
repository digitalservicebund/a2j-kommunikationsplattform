import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

/**
 * @see: https://github.com/dotenv-org/examples/blob/master/usage/dotenv-express/index.mjs
 */
dotenv.config();

const environment = process.env.ENVIRONMENT?.trim() ?? "";
const mockJustizBackendAPI = environment === "development";
const isProduction = process.env.NODE_ENV === "production";

// info logs
let infoLog = `Info:
  -> Environment is "${environment}"
  -> Production build: ${isProduction ? "yes" : "no"}
  -> API will be mocked: ${mockJustizBackendAPI ? "yes" : "no"}
`;

if (mockJustizBackendAPI) {
  infoLog +=
    "  -> Setting up a Justiz-Backend-API mock for local development\n";
}

if (!isProduction) {
  infoLog += "  -> Setting up a viteDevServer for local development\n";
}

if (mockJustizBackendAPI) {
  const mockJustizBackendService = mockJustizBackendAPI
    ? await import("./mocks/api/node.js")
    : undefined;

  if (mockJustizBackendService) {
    mockJustizBackendService.server.listen();
  }
}

const viteDevServer = isProduction
  ? undefined
  : await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      }),
    );

const reactRouterHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:react-router/server-build")
    : await import("./build/server/index.js"),
});

const app = express();
app.use(compression());
app.disable("x-powered-by");

if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
  );

  if (environment === "staging") {
    infoLog += '  -> Add "X-Robots-Tag: noindex" header to all requests\n';

    app.use((req, res, next) => {
      /**
       * Set noindex header for all requests on staging environment
       *
       * @see: https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=en#http-response-header
       */
      res.set("X-Robots-Tag", "noindex");
      next();
    });
  }
}

app.use(express.static("build/client", { maxAge: "1h" }));
app.use(morgan("tiny"));

/**
 * Express v5 upgrade is missing regular expression documentation
 *
 * @see: https://github.com/expressjs/express/issues/5936#issuecomment-2808486653 and
 * @see: https://expressjs.com/en/guide/migrating-5.html#path-syntax
 */
app.all(/(.*)/, reactRouterHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(infoLog);
  console.log(`Express server listening at http://localhost:${port}\n`);
});
