import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

/**
 * @see: https://github.com/dotenv-org/examples/blob/master/usage/dotenv-express/index.mjs
 */
dotenv.config();

const viteDevServer =
  process.env.NODE_ENV === "production"
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
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`),
);
