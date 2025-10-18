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
          "app/root.tsx",
          // exclude routes (pages) - we test them via e2e tests, see /tests/e2e/**
          "app/routes/**",
          // include routes (actions)
          "!app/routes/action.*.ts",
          // test files
          "app/**/__test__/*.test.{ts,tsx}",
          // exclude static files
          "app/**/*.static.tsx",
          // exclude routes.ts
          "app/routes.ts",
          // exclude all files from constants directory
          "app/constants/**",
        ],
        reporter: ["text", "lcov"],
      },
      environment: "node",
      globals: true,
      include: ["./app/**/__test__/*.test.{ts,tsx}"],
      // For in-source testing
      includeSource: ["./app/**/*.{js,ts}"],
      pool: "threads",
      setupFiles: ["vitest.setup.ts"],
    },
  };
});
