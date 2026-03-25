import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((config) => {
  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      // React Router doesn't work in Vitest's environment,
      // see: https://akoskm.com/react-router-vitest-example/
      !process.env.VITEST && reactRouter(),
      sentryReactRouter(
        {
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: "digitalservice",
          project: "a2j-kompla",
        },
        config,
      ),
      tailwindcss(),
      tsconfigPaths(),
    ],
    server: { port: 3000 },
  };
});
