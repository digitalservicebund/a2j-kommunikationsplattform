import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: "istanbul",
      include: ["app/**/**.{ts,tsx}"],
      exclude: [
        "app/entry.client.tsx",
        "app/entry.server.tsx",
        "app/root.tsx",
        // exclude all routes by default - will be tested via e2e, see /tests/e2e/**
        // action.*.ts files are intentionally kept for unit test coverage within
        // includes config
        "app/routes/*.{ts,tsx}",
        // test files
        "app/**/__test__/*.test.{ts,tsx}",
        // exclude static files
        "app/**/*.static.tsx",
        // exclude schema files
        "app/**/schemas/*.ts",
        // exclude routes.ts
        "app/routes.ts",
        // exclude all files from constants directory
        "app/constants/**",
        // exclude mock files
        "app/mocks/**/*.{ts,tsx}",
        // exclude prototype/spike files
        "app/**/prototype.*.{ts,tsx}",
      ],
      reporter: ["text", "lcov"],
    },
    environment: "node",
    globals: true,
    include: ["./app/**/__test__/*.test.{ts,tsx}", "app/routes/action.*.tsx"],
    // For in-source testing
    includeSource: ["./app/**/*.{js,ts}"],
    pool: "threads",
    setupFiles: ["vitest.setup.ts"],
  },
});
