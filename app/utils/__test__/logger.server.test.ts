import { beforeEach, describe, expect, it, vi } from "vitest";

const pinoMock = vi.fn(() => ({}));
const pinoPrettyStreamMock = Symbol("pino-pretty stream");
const pinoPrettyMock = vi.fn(() => pinoPrettyStreamMock);
const errSerializer = vi.fn();
const reqSerializer = vi.fn();
const resSerializer = vi.fn();

vi.mock("pino", () => ({
  default: Object.assign(pinoMock, {
    stdSerializers: {
      err: errSerializer,
      req: reqSerializer,
      res: resSerializer,
    },
  }),
}));

vi.mock("pino-pretty", () => ({
  default: pinoPrettyMock,
}));

describe("logger.server", () => {
  beforeEach(() => {
    vi.resetModules();
    pinoMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
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
        serializers: {
          error: errSerializer,
          req: reqSerializer,
          res: resSerializer,
        },
        redact: expect.arrayContaining([
          "headers.authorization",
          "headers.Authorization",
          "headers.cookie",
          "headers.Cookie",
          "req.headers.authorization",
          "req.headers.cookie",
          "res.headers.set-cookie",
        ]),
      }),
      undefined,
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

    await import("../logger.server");

    expect(pinoMock).toHaveBeenCalledWith(
      expect.anything(),
      pinoPrettyStreamMock,
    );
  });
});
