import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { sentryReactRouter } from "@sentry/react-router";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((config) => {
  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      reactRouter(),
      tsconfigPaths(),
      sentryReactRouter(
        {
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: "digitalservice",
          project: "a2j_kompla",
        },
        config,
      ),
    ],
    server: { port: 3000 },
  };
});
