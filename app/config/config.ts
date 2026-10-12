export interface Config {
  ENVIRONMENT: string;
  LOG_LEVEL: string;
  SENTRY_DSN: string;
}

interface EnvironmentVariables {
  [key: string]: string | undefined;
}

// The server passes relevant environment variables to the client by
// rendering an inline <script> that stores the variables in `window.ENV`.
// See `app/root.tsx`.
declare global {
  interface Window {
    ENV?: EnvironmentVariables;
  }
}

function envFromBrowser(): EnvironmentVariables | undefined {
  return typeof window === "object" && "ENV" in window ? window.ENV : undefined;
}

function envFromNode(): EnvironmentVariables | undefined {
  return typeof process === "object" && "env" in process
    ? process.env
    : undefined;
}

export function config(): Config {
  const env = envFromBrowser() ?? envFromNode() ?? {};
  return {
    ENVIRONMENT: env.ENVIRONMENT?.trim() ?? "development",
    LOG_LEVEL: env.LOG_LEVEL?.trim() ?? "info",
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
      ENVIRONMENT: "development",
      LOG_LEVEL: "info",
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
