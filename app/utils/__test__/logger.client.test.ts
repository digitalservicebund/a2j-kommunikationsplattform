import { describe, expect, it, vi } from "vitest";

const pinoMock = vi.fn(() => ({}));

vi.mock("pino", () => ({ default: pinoMock }));

vi.mock("~/config/config", () => ({
  config: () => ({
    ENVIRONMENT: "production",
    LOG_LEVEL: "warn",
    SENTRY_DSN: "",
  }),
}));

describe("logger.client", () => {
  it("configures pino for the browser using LOG_LEVEL from config", async () => {
    await import("../logger.client");

    expect(pinoMock).toHaveBeenCalledWith({
      level: "warn",
      browser: { asObject: true },
    });
  });
});
