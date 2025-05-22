const envFromBrowser = () =>
  typeof window === "object" && "ENV" in window
    ? (window?.ENV as Record<string, string | undefined>)
    : undefined;

const envFromNode = () =>
  typeof process === "object" && "env" in process ? process?.env : undefined;

export function config() {
  console.log("hi");
  const env = envFromBrowser() ?? envFromNode() ?? {};
  return {
    SENTRY_DSN: env.SENTRY_DSN?.trim(),
  };
}
