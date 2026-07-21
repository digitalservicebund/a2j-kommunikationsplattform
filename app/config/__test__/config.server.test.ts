import { describe, expect, it, vi } from "vitest";

type ImportConfigServerOptions = {
  environment?: string;
  fileExistsByPath?: Record<string, boolean>;
  fileValueByPath?: Record<string, string>;
};

const secretPathBrak = "/etc/secrets/BRAK_IDP_OIDC_CLIENT_SECRET";
const secretPathDemo = "/etc/secrets/KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET";
const secretPathApiIdp = "/etc/secrets/KOMPLA_IDP_OIDC_CLIENT_SECRET";

async function importConfigServerWithMocks(
  options: ImportConfigServerOptions = {},
) {
  vi.resetModules();

  const environment = options.environment ?? "development";
  const fileExistsByPath = options.fileExistsByPath ?? {
    [secretPathBrak]: true,
    [secretPathDemo]: true,
    [secretPathApiIdp]: true,
  };
  const fileValueByPath = options.fileValueByPath ?? {
    [secretPathBrak]: "BRAK_FILE_SECRET",
    [secretPathDemo]: "DEMO_FILE_SECRET",
    [secretPathApiIdp]: "API_IDP_FILE_SECRET",
  };

  const existsSyncMock = vi.fn(
    (path: string) => fileExistsByPath[path] ?? false,
  );
  const readFileSyncMock = vi.fn(
    (path: string) => fileValueByPath[path] ?? "UNEXPECTED_FILE_VALUE",
  );

  vi.doMock("fs", () => ({
    existsSync: existsSyncMock,
    readFileSync: readFileSyncMock,
  }));

  vi.doMock("../config", () => ({
    config: () => ({ ENVIRONMENT: environment, SENTRY_DSN: "" }),
  }));

  const module = await import("../config.server");

  return {
    module,
    existsSyncMock,
    readFileSyncMock,
  };
}

describe("serverConfig()", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns secrets from files when secret files exist", async () => {
    const { module, existsSyncMock, readFileSyncMock } =
      await importConfigServerWithMocks();

    const testConfig = module.serverConfig();

    expect(existsSyncMock).toHaveBeenCalledWith(secretPathBrak);
    expect(existsSyncMock).toHaveBeenCalledWith(secretPathDemo);
    expect(existsSyncMock).toHaveBeenCalledWith(secretPathApiIdp);
    expect(readFileSyncMock).toHaveBeenCalledWith(secretPathBrak, "utf-8");
    expect(readFileSyncMock).toHaveBeenCalledWith(secretPathDemo, "utf-8");
    expect(readFileSyncMock).toHaveBeenCalledWith(secretPathApiIdp, "utf-8");
    expect(testConfig.BRAK_IDP_OIDC_CLIENT_SECRET).toBe("BRAK_FILE_SECRET");
    expect(testConfig.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET).toBe(
      "DEMO_FILE_SECRET",
    );
    expect(testConfig.KOMPLA_IDP_OIDC_CLIENT_SECRET).toBe(
      "API_IDP_FILE_SECRET",
    );
  });

  it("uses env fallback secrets in development when secret files are missing", async () => {
    process.env.BRAK_IDP_OIDC_CLIENT_SECRET = "  brak-fallback  ";
    process.env.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET = "  demo-fallback  ";

    const { module, readFileSyncMock } = await importConfigServerWithMocks({
      environment: "development",
      fileExistsByPath: {
        [secretPathBrak]: false,
        [secretPathDemo]: false,
      },
    });

    const testConfig = module.serverConfig();

    expect(readFileSyncMock).not.toHaveBeenCalled();
    expect(testConfig.BRAK_IDP_OIDC_CLIENT_SECRET).toBe("brak-fallback");
    expect(testConfig.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET).toBe(
      "demo-fallback",
    );
  });

  it("falls back to empty string for secrets in development when files are missing and env vars are unset", async () => {
    delete process.env.BRAK_IDP_OIDC_CLIENT_SECRET;
    delete process.env.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET;
    delete process.env.KOMPLA_IDP_OIDC_CLIENT_SECRET;

    const { module } = await importConfigServerWithMocks({
      environment: "development",
      fileExistsByPath: {
        [secretPathBrak]: false,
        [secretPathDemo]: false,
        [secretPathApiIdp]: false,
      },
    });

    const testConfig = module.serverConfig();

    expect(testConfig.BRAK_IDP_OIDC_CLIENT_SECRET).toBe("");
    expect(testConfig.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET).toBe("");
    expect(testConfig.KOMPLA_IDP_OIDC_CLIENT_SECRET).toBe("");
  });

  it("returns empty fallback secrets outside development when files are missing", async () => {
    process.env.BRAK_IDP_OIDC_CLIENT_SECRET = "from-env-but-ignored";
    process.env.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET =
      "from-env-but-ignored";

    const { module } = await importConfigServerWithMocks({
      environment: "production",
      fileExistsByPath: {
        [secretPathBrak]: false,
        [secretPathDemo]: false,
      },
    });

    const testConfig = module.serverConfig();

    expect(testConfig.BRAK_IDP_OIDC_CLIENT_SECRET).toBe("");
    expect(testConfig.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET).toBe("");
  });

  it("trims values and uses empty string defaults for undefined env vars", async () => {
    process.env.BRAK_IDP_OIDC_CLIENT_ID = "  client-id  ";
    process.env.BRAK_IDP_OIDC_ISSUER = "  issuer  ";
    process.env.BRAK_IDP_OIDC_REDIRECT_URI = "  https://example.org/callback  ";
    process.env.KOMPLA_API_URL = "  https://api.example.org  ";
    process.env.KOMPLA_IDP_OIDC_CLIENT_ID = "  api-client  ";
    process.env.KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT = "  api-issuer  ";
    process.env.KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER = "  subject-issuer  ";
    process.env.KOMPLA_IDP_OIDC_ISSUER = "  demo-issuer  ";
    process.env.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_ID = "  demo-service-client  ";
    process.env.KOMPLA_MAGIC_LINK_CLIENT_ID = "  demo-client  ";
    process.env.KOMPLA_MAGIC_LINK_REDIRECT_URI =
      "  https://demo.example.org/callback  ";
    process.env.KOMPLA_MAGIC_LINK_DEMO_USERNAME = "  username  ";
    process.env.KOMPLA_MAGIC_LINK_DEMO_EMAIL = "  user@example.org  ";
    process.env.SENTRY_DSN = "  sentry-dsn  ";
    delete process.env.KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT;

    const { module } = await importConfigServerWithMocks();
    const testConfig = module.serverConfig();

    expect(testConfig.BRAK_IDP_OIDC_CLIENT_ID).toBe("client-id");
    expect(testConfig.BRAK_IDP_OIDC_ISSUER).toBe("issuer");
    expect(testConfig.BRAK_IDP_OIDC_REDIRECT_URI).toBe(
      "https://example.org/callback",
    );
    expect(testConfig.KOMPLA_API_URL).toBe("https://api.example.org");
    expect(testConfig.KOMPLA_IDP_OIDC_CLIENT_ID).toBe("api-client");
    expect(testConfig.KOMPLA_IDP_OIDC_BRAK_TOKEN_ENDPOINT).toBe("");
    expect(testConfig.KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER).toBe(
      "subject-issuer",
    );
    expect(testConfig.KOMPLA_IDP_OIDC_ISSUER).toBe("demo-issuer");
    expect(testConfig.KOMPLA_MAGIC_LINK_SERVICE_CLIENT_ID).toBe(
      "demo-service-client",
    );
    expect(testConfig.KOMPLA_MAGIC_LINK_CLIENT_ID).toBe("demo-client");
    expect(testConfig.KOMPLA_MAGIC_LINK_REDIRECT_URI).toBe(
      "https://demo.example.org/callback",
    );
    expect(testConfig.KOMPLA_MAGIC_LINK_DEMO_USERNAME).toBe("username");
    expect(testConfig.KOMPLA_MAGIC_LINK_DEMO_EMAIL).toBe("user@example.org");
    expect(testConfig.SENTRY_DSN).toBe("sentry-dsn");
  });

  it("returns empty string defaults when other env vars are undefined", async () => {
    const envVarsWithEmptyDefault = [
      "BRAK_IDP_OIDC_CLIENT_ID",
      "BRAK_IDP_OIDC_ISSUER",
      "BRAK_IDP_OIDC_REDIRECT_URI",
      "KOMPLA_API_URL",
      "KOMPLA_IDP_OIDC_CLIENT_ID",
      "KOMPLA_IDP_OIDC_BRAK_SUBJECT_ISSUER",
      "KOMPLA_IDP_OIDC_ISSUER",
      "KOMPLA_MAGIC_LINK_SERVICE_CLIENT_ID",
      "KOMPLA_MAGIC_LINK_CLIENT_ID",
      "KOMPLA_MAGIC_LINK_REDIRECT_URI",
      "KOMPLA_MAGIC_LINK_DEMO_USERNAME",
      "KOMPLA_MAGIC_LINK_DEMO_EMAIL",
      "KOMPLA_IDP_OIDC_REDIRECT_URI",
    ] as const;

    for (const key of envVarsWithEmptyDefault) {
      delete process.env[key];
    }

    const { module } = await importConfigServerWithMocks();
    const testConfig = module.serverConfig();

    for (const key of envVarsWithEmptyDefault) {
      expect(testConfig[key]).toBe("");
    }
  });
});
