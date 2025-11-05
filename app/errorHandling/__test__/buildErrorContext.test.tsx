import { isRouteErrorResponse } from "react-router";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

vi.mock("react-router", () => ({ isRouteErrorResponse: vi.fn() }));

import { dictionaries, type Language } from "~/services/translations";
import { buildErrorContext } from "../buildErrorContext";

const mockIsRouteErrorResponse = isRouteErrorResponse as unknown as Mock;

describe("buildErrorContext", () => {
  const locale: Language = "de";

  beforeEach(() => {
    mockIsRouteErrorResponse.mockReset();
  });

  it("returns 404 content for a route error with status 404", () => {
    mockIsRouteErrorResponse.mockReturnValue(true);
    const routeErr = { status: 404 };

    const { errorContent, errorToReport } = buildErrorContext(routeErr, false);

    expect(errorToReport).toBeUndefined();
    expect(errorContent.label).toBe(
      dictionaries[locale].errorMessages.UNKNOWN_PAGE_LABEL,
    );
    expect(errorContent.heading).toBe(
      dictionaries[locale].errorMessages.UNKNOWN_PAGE_HEADING,
    );
  });

  it("returns 500 content for unknown route error status", () => {
    mockIsRouteErrorResponse.mockReturnValue(true);
    const routeErr = { status: 418 };

    const { errorContent, errorToReport } = buildErrorContext(routeErr, false);

    expect(errorToReport).toBeUndefined();
    expect(errorContent.label).toBe(
      dictionaries[locale].errorMessages.SERVER_ERROR_LABEL,
    );
  });

  it("in dev shows Error details and does not mark for reporting", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    const err = new Error("dev-fail");
    err.stack = "stack-trace";

    const { errorContent, errorToReport } = buildErrorContext(err, true);

    expect(errorToReport).toBeUndefined();
    expect(errorContent.label).toBe("Error");
    expect(errorContent.heading).toBe("dev-fail");
    expect(errorContent.body).toBe("stack-trace");
  });

  it("in production marks Error for reporting and shows 500 content", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    const err = new Error("prod-fail");

    const { errorContent, errorToReport } = buildErrorContext(err, false);

    expect(errorToReport).toBe(err);
    expect(errorContent.label).toBe(
      dictionaries[locale].errorMessages.SERVER_ERROR_LABEL,
    );
    expect(errorContent.redirectUrl).toBe("/hilfe-und-kontakt");
  });

  it("non-Error throws are marked for reporting and keep generic message", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    const thrown = "some-primitive-error";

    const { errorContent, errorToReport } = buildErrorContext(thrown, false);

    expect(errorToReport).toBe(thrown);
    expect(errorContent.label).toBe(
      dictionaries[locale].errorMessages.GENERIC_ERROR_LABEL,
    );
  });
  it("in dev shows empty body when Error.stack is undefined", () => {
    mockIsRouteErrorResponse.mockReturnValue(false);
    const err = new Error("dev-no-stack");
    // remove stack to exercise the `error.stack || ""` branch
    err.stack = undefined;

    const { errorContent, errorToReport } = buildErrorContext(err, true);

    expect(errorToReport).toBeUndefined();
    expect(errorContent.label).toBe("Error");
    expect(errorContent.heading).toBe("dev-no-stack");
    expect(errorContent.body).toBe("");
  });
});
