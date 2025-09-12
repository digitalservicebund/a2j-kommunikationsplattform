import { getCspHeader } from "../cspHeader.server";

describe("getCspHeader", () => {
  const defaultArgs = {
    nonce: "r4nd0mN0nc3",
    environment: "test",
    additionalConnectSrc: ["https://trusted.com"],
  };

  it("contains all OWASP recommended directives", () => {
    const defaultHeader = getCspHeader(defaultArgs);

    expect(defaultHeader).toContain("default-src 'self';");
    expect(defaultHeader).toContain("object-src");
    expect(defaultHeader).toContain("base-uri");
    expect(defaultHeader).toContain("form-action");
    expect(defaultHeader).toContain("frame-src");
    expect(defaultHeader).toContain("style-src");
    expect(defaultHeader).toContain("img-src");
    expect(defaultHeader).toContain("upgrade-insecure-requests");
    expect(defaultHeader).toContain("frame-ancestors 'none'");

    const scriptDirective = defaultHeader
      .split(";")
      .find((directive) => directive.startsWith("script-src"));
    expect(scriptDirective).toContain("nonce-r4nd0mN0nc3");
    expect(scriptDirective).toContain("'strict-dynamic'");
    expect(scriptDirective).not.toContain("unsafe-inline");
  });

  it("passed additionalConnectSrc to appear", () => {
    expect(getCspHeader(defaultArgs)).toContain("https://trusted.com");
  });

  it("doesn't reference localhost by default", () => {
    expect(getCspHeader(defaultArgs)).not.toContain("localhost");
  });

  it("only adds localhost in development environment", () => {
    const developmentCspHeaders = getCspHeader({
      nonce: "r4nd0mN0nc3",
      environment: "development",
      additionalConnectSrc: ["https://trusted.com"],
    });
    expect(developmentCspHeaders).toContain("localhost");
    expect(developmentCspHeaders).not.toContain("upgrade-insecure-requests");
  });

  it("includes additionalConnectSrc when provided", () => {
    const header = getCspHeader({
      nonce: "testnonce",
      environment: "production",
      additionalConnectSrc: ["https://extra.com"],
    });
    const normalizedHeader = header.replace(/\s+/g, " ");
    expect(normalizedHeader).toContain(
      "connect-src 'self' openplzapi.org eu.i.posthog.com https://extra.com",
    );
  });

  it("handles additionalConnectSrc as undefined", () => {
    const header = getCspHeader({
      nonce: "testnonce",
      environment: "production",
      additionalConnectSrc: undefined,
    });
    expect(header).toContain(
      "connect-src 'self' openplzapi.org eu.i.posthog.com",
    );
  });
});
