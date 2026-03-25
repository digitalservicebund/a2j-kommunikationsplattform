import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: "istanbul",
      include: ["app/**"],
      exclude: [
        "app/entry.client.tsx",
        "app/entry.server.tsx",
        "app/root.tsx",
        // exclude route pages/layouts - tested via e2e, see /tests/e2e/**
        // action.*.ts files are intentionally kept for unit test coverage
        "app/routes/_index.tsx",
        "app/routes/_layout.tsx",
        "app/routes/error.tsx",
        "app/routes/readyz.ts",
        "app/routes/auth.**",
        "app/routes/login/**",
        "app/routes/verfahren/**",
        "app/routes/kitchensink/**",
        "app/routes/barrierefreiheit.tsx",
        "app/routes/datenschutz.tsx",
        "app/routes/hilfe-und-kontakt.tsx",
        "app/routes/impressum.tsx",
        "app/routes/open-source.tsx",
        "app/routes/weitere-informationen.tsx",
        // test files
        "app/**/__test__/*.test.{ts,tsx}",
        // exclude static files
        "app/**/*.static.tsx",
        // exclude routes.ts
        "app/routes.ts",
        // exclude all files from constants directory
        "app/constants/**",
        // exclude mock files
        "app/mocks/**/*.{ts,tsx}",
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
});
