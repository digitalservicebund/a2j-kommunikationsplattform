import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { serverConfig } from "../config.server";

vi.mock("node:fs", () => ({
  existsSync: vi.fn(() => false),
  readFileSync: vi.fn(() => ""),
}));

function mockSecretFiles(files: Record<string, string | false>) {
  vi.mocked(existsSync).mockImplementation(
    (path) => files[String(path)] !== false,
  );
  vi.mocked(readFileSync).mockImplementation(
    (path) => files[String(path)] || "",
  );
}

describe("serverConfig()", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    serverConfig.cache.clear();
  });

  it("returns non-secret configuration values from the environment", () => {
    vi.stubEnv("ENVIRONMENT", "production");
    vi.stubEnv("BRAK_IDP_OIDC_ISSUER", "http://example.com/");

    const config = serverConfig();

    expect(config.SENTRY_DSN).toBe("");
  });

  it("falls back to default value or empty string if environment variable is not set", () => {
    vi.stubEnv("BETTER_AUTH_URL", undefined);
    vi.stubEnv("BRAK_IDP_OIDC_REDIRECT_URI", undefined);

    const config = serverConfig();

    expect(config.BETTER_AUTH_URL).toBe("http://localhost:3000");
    expect(config.BRAK_IDP_OIDC_REDIRECT_URI).toBe("");
  });

  it("returns an empty string for an undefined config item", () => {
    vi.stubEnv("SENTRY_DSN", undefined);

    const config = serverConfig();

    expect(config.SENTRY_DSN).toBe("");
  });

  it("returns secrets from '/env/secrets' files when they exist", () => {
    mockSecretFiles({
      "/etc/secrets/BRAK_IDP_OIDC_CLIENT_SECRET": "BRAK_FILE_SECRET",
      "/etc/secrets/KOMPLA_IDP_OIDC_CLIENT_SECRET": "API_IDP_FILE_SECRET",
    });

    const config = serverConfig();

    expect(config.BRAK_IDP_OIDC_CLIENT_SECRET).toBe("BRAK_FILE_SECRET");
    expect(config.KOMPLA_IDP_OIDC_CLIENT_SECRET).toBe("API_IDP_FILE_SECRET");
  });

  describe("during local development", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
      vi.stubEnv("ENVIRONMENT", "development");
    });

    it("falls back to environment variable if secret file is missing", () => {
      mockSecretFiles({ "/etc/secrets/BRAK_IDP_OIDC_CLIENT_SECRET": false });
      vi.stubEnv("BRAK_IDP_OIDC_CLIENT_SECRET", "SECRET_FROM_ENV");

      const config = serverConfig();

      expect(config.BRAK_IDP_OIDC_CLIENT_SECRET).toBe("SECRET_FROM_ENV");
    });
  });

  describe("in production", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
      vi.stubEnv("ENVIRONMENT", "production");
    });

    it("falls back to empty string if secret file is missing", () => {
      mockSecretFiles({ "/etc/secrets/BRAK_IDP_OIDC_CLIENT_SECRET": false });
      vi.stubEnv("BRAK_IDP_OIDC_CLIENT_SECRET", "IGNORED_SECRET_FROM_ENV");

      const config = serverConfig();

      expect(config.BRAK_IDP_OIDC_CLIENT_SECRET).toBe("");
    });
  });
});
