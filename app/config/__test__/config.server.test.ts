import * as cerverConfigModule from "../config.server";

describe("serverConfig()", () => {
  const originalEnv = process.env;
  /* eslint-disable @typescript-eslint/no-explicit-any */

  beforeEach(() => {
    // reset singleton instance before each test
    (cerverConfigModule as any).instance = undefined;
    // save and clear process.env
    process.env = { ...originalEnv };
    delete process.env.SENTRY_DSN;
  });

  afterEach(() => {
    // restore process.env
    process.env = originalEnv;
    (cerverConfigModule as any).instance = undefined;
  });

  it("returns the same instance and config items (singleton)", () => {
    process.env = { SENTRY_DSN: "first" };
    const first = cerverConfigModule.serverConfig();
    process.env = { SENTRY_DSN: "second" };
    const second = cerverConfigModule.serverConfig();
    expect(first).toBe(second);
    expect(second.SENTRY_DSN).toBe("first");
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */
});
