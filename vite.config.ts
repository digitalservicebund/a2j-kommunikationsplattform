import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
// import { sentryReactRouter } from '@sentry/react-router';
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig = {
  authToken: "...",
  org: "...",
  project: "...",
};

export default defineConfig((config) => {
  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      reactRouter(),
      tsconfigPaths(),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "digitalservice",
        project: "a2j_kompla",
      }),
    ],
    server: { port: 3000 },
  };
});
