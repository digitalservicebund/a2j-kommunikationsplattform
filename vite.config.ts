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
      reactRouter(),
      sentryReactRouter(
        {
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: "digitalservice",
          project: "a2j_kompla",
        },
        config,
      ),
      tailwindcss(),
      tsconfigPaths(),
    ],
    server: { port: 3000 },
    test: {
      coverage: {
        provider: "istanbul",
        include: ["app/**"],
        exclude: [
          "app/entry.client.tsx",
          "app/entry.server.tsx",
          "app/instrument.server.mjs",
          "app/root.tsx",
          // exclude routes (pages)
          "app/routes/**",
          // excluded technical prototypes (spikes) that will be removed/reworked
          "app/services/fileUpload.server.ts",
          "app/services/justizBackend.server.ts",
          // test files
          "app/**/__test__/*.test.{ts,tsx}",
        ],
        reporter: ["text", "lcov"],
      },
      environment: "node",
      globals: true,
      include: ["./app/**/__test__/*.test.{ts,tsx}"],
      pool: "threads",
      setupFiles: ["vitest.setup.ts"],
    },
  };
});
