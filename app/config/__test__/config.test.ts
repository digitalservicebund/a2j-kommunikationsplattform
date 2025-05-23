// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import * as configModule from "../config";

describe("config()", () => {
  const originalEnv = process.env;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let originalWindowEnv: any;

  beforeEach(() => {
    // reset singleton instance before each test
    (configModule as any).instance = undefined;
    // save and clear window.ENV
    originalWindowEnv = (window as any).ENV;
    delete (window as any).ENV;
    // save and clear process.env
    process.env = { ...originalEnv };
    delete process.env.SENTRY_DSN;
  });

  afterEach(() => {
    // restore window.ENV and process.env
    if (originalWindowEnv !== undefined) {
      (window as any).ENV = originalWindowEnv;
    } else {
      delete (window as any).ENV;
    }
    process.env = originalEnv;
    (configModule as any).instance = undefined;
  });

  it("returns the same instance and config items (singleton)", () => {
    (window as any).ENV = { SENTRY_DSN: "first" };
    const first = configModule.config();
    (window as any).ENV = { SENTRY_DSN: "second" };
    const second = configModule.config();
    expect(first).toBe(second);
    expect(second!.SENTRY_DSN).toBe("first");
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */
});
