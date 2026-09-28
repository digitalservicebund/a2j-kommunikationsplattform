import { beforeEach, describe, expect, it, vi } from "vitest";

const pinoMock = vi.fn(() => ({}));
const errSerializer = vi.fn();

vi.mock("pino", () => ({
  default: Object.assign(pinoMock, { stdSerializers: { err: errSerializer } }),
}));

describe("logger.server", () => {
  beforeEach(() => {
    vi.resetModules();
    pinoMock.mockClear();
  });

  it("uses LOG_LEVEL, redacts sensitive fields, and skips the pretty transport outside development", async () => {
    vi.doMock("~/config/config", () => ({
      config: () => ({
        ENVIRONMENT: "production",
        LOG_LEVEL: "warn",
        SENTRY_DSN: "",
      }),
    }));

    await import("../logger.server");

    expect(pinoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "warn",
        serializers: { error: errSerializer },
        redact: expect.arrayContaining([
          "req.headers.authorization",
          "req.headers.cookie",
          "res.headers.set-cookie",
        ]),
        transport: undefined,
      }),
    );
  });

  it("uses the pino-pretty transport in development", async () => {
    vi.doMock("~/config/config", () => ({
      config: () => ({
        ENVIRONMENT: "development",
        LOG_LEVEL: "debug",
        SENTRY_DSN: "",
      }),
    }));
    vi.stubEnv("VITEST", "");

    await import("../logger.server");

    expect(pinoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        transport: { target: "pino-pretty", options: { colorize: true } },
      }),
    );

    vi.unstubAllEnvs();
  });

  it("skips the pretty transport under Vitest even in development", async () => {
    vi.doMock("~/config/config", () => ({
      config: () => ({
        ENVIRONMENT: "development",
        LOG_LEVEL: "debug",
        SENTRY_DSN: "",
      }),
    }));

    await import("../logger.server");

    expect(pinoMock).toHaveBeenCalledWith(
      expect.objectContaining({ transport: undefined }),
    );
  });
});
