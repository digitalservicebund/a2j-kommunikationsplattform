interface ClientConfig {
  ENVIRONMENT: string;
  SENTRY_DSN: string;
}

const envFromBrowser = () =>
  typeof window === "object" && "ENV" in window
    ? (window?.ENV as Record<string, string | undefined>)
    : undefined;

const envFromNode = () =>
  typeof process === "object" && "env" in process ? process?.env : undefined;

export function config(): ClientConfig {
  const env = envFromBrowser() ?? envFromNode() ?? {};

  return {
    ENVIRONMENT: env.ENVIRONMENT?.trim() ?? "",
    SENTRY_DSN: env.SENTRY_DSN?.trim() ?? "",
  };
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("If node and browser env are undefined, config items with empty strings will be returned", () => {
    // save original process
    const originalProcess = global.process;
    // save original window
    const originalWindow = global.window;
    // @ts-expect-error to test this use case
    delete global.process;
    // @ts-expect-error to test this use case
    delete global.window;
    const getConfig = config();
    expect(getConfig).toStrictEqual({
      ENVIRONMENT: "",
      SENTRY_DSN: "",
    });
    // restore process
    global.process = originalProcess;
    // restore window
    global.window = originalWindow;
  });

  it("envFromNode() returns undefined if process is not defined", () => {
    // save original process
    const originalProcess = global.process;
    // @ts-expect-error to test this use case
    delete global.process;
    expect(envFromNode()).toBeUndefined();
    // restore process
    global.process = originalProcess;
  });

  it("envFromNode() returns environment if process and process.env are defined", () => {
    const getEnvFromNode = envFromNode();
    expect(getEnvFromNode).toBeDefined();
  });

  it("config() returns an empty string for an undefined config item", () => {
    // save original item
    const originalEnvItem = global.process.env.SENTRY_DSN;
    delete global.process.env.SENTRY_DSN;
    const getConfig = config();
    expect(getConfig?.SENTRY_DSN).toBe("");
    // restore item
    global.process.env.SENTRY_DSN = originalEnvItem;
  });

  it("envFromBrowser() returns undefined if window is not defined (node environment)", () => {
    // save original window
    const originalWindow = global.window;
    // @ts-expect-error to test this use case
    delete global.window;
    expect(envFromBrowser()).toBeUndefined();
    // restore window
    global.window = originalWindow;
  });
}
