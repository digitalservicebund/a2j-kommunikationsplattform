import { isRouteErrorResponse } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { dictionaries, type Locale } from "~/services/translations";
import { buildErrorContent } from "../buildErrorContent";

vi.mock("react-router", () => ({
  isRouteErrorResponse: vi.fn(),
}));

describe("buildErrorContent", () => {
  const locale: Locale = "de";
  const { errorMessages } = dictionaries[locale];

  beforeEach(() => {
    vi.mocked(isRouteErrorResponse).mockReset();
  });

  it("returns 404 content for a route error with status 404", () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);
    const routeErr = { status: 404 };

    const errorContent = buildErrorContent(routeErr, {
      locale,
      isDev: false,
    });

    expect(errorContent.label).toBe(errorMessages.UNKNOWN_PAGE_LABEL);
    expect(errorContent.heading).toBe(errorMessages.UNKNOWN_PAGE_HEADING);
  });

  it("returns 500 content for unknown route error status", () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);
    const routeErr = { status: 418 };

    const errorContent = buildErrorContent(routeErr, {
      locale,
      isDev: false,
    });

    expect(errorContent.label).toBe(errorMessages.SERVER_ERROR_LABEL);
  });

  it("returns generic message for non-Error throws", () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    const thrown = "some-primitive-error";

    const errorContent = buildErrorContent(thrown, {
      locale,
      isDev: false,
    });

    expect(errorContent.label).toBe(errorMessages.GENERIC_ERROR_LABEL);
  });

  describe("in local development environment", () => {
    it("returns error details for non-routing-response Error", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      const err = new Error("dev-fail");
      err.stack = "stack-trace";

      const errorContent = buildErrorContent(err, {
        locale,
        isDev: true,
      });

      expect(errorContent.label).toBe("Error");
      expect(errorContent.heading).toBe("dev-fail");
      expect(errorContent.body).toBe("stack-trace");
    });

    it("returns empty body when error.stack is undefined", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      const err = new Error("dev-no-stack");
      err.stack = undefined;

      const errorContent = buildErrorContent(err, {
        locale,
        isDev: true,
      });

      expect(errorContent.label).toBe("Error");
      expect(errorContent.heading).toBe("dev-no-stack");
      expect(errorContent.body).toBe("");
    });
  });

  describe("in staging or production environment", () => {
    it("returns generic error for non-routing-response Error", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      const err = new Error("prod-fail");

      const errorContent = buildErrorContent(err, {
        locale,
        isDev: false,
      });

      expect(errorContent.label).toBe(errorMessages.GENERIC_ERROR_LABEL);
      expect(errorContent.redirectUrl).toBe("/hilfe-und-kontakt");
    });
  });
});
