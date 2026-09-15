import * as Sentry from "@sentry/react-router";
import { describe, vi } from "vitest";
import { initializeSentryOnClient, initializeSentryOnServer } from "~/sentry";

vi.mock("@sentry/react-router", () => ({
  init: vi.fn(),
  reactRouterTracingIntegration: vi.fn(),
}));

vi.mock("~/config/config", () => ({
  config: () => ({
    ENVIRONMENT: "development",
    SENTRY_DSN: "example",
  }),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("initializeSentryOnClient", () => {
  beforeEach(() => {
    initializeSentryOnClient();
  });

  it("derives DSN and environment from app config", () => {
    expect(vi.mocked(Sentry.init)).toHaveBeenCalledWith(
      expect.objectContaining({ dsn: "example" }),
    );
  });

  it("disables sending of user info", () => {
    expect(vi.mocked(Sentry.init)).toHaveBeenCalledWith(
      expect.objectContaining({
        dataCollection: expect.objectContaining({
          userInfo: false,
        }),
      }),
    );
  });
});

describe("initializeSentryOnServer", () => {
  beforeEach(() => {
    initializeSentryOnServer();
  });

  it("derives DSN and environment from app config", () => {
    expect(vi.mocked(Sentry.init)).toHaveBeenCalledWith(
      expect.objectContaining({ dsn: "example" }),
    );
  });

  it("disables sending of user info", () => {
    expect(vi.mocked(Sentry.init)).toHaveBeenCalledWith(
      expect.objectContaining({
        dataCollection: expect.objectContaining({
          userInfo: false,
        }),
      }),
    );
  });
});
