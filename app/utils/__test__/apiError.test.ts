import { describe, expect, it } from "vitest";
import { ApiError, isApiError, isClientSideApiError } from "../apiError";

describe("ApiError", () => {
  it("exposes status and problemDetails alongside the standard Error fields", () => {
    const problemDetails = { title: "Conflict", status: 409 };
    const error = new ApiError("Verfahren update failed", {
      status: 409,
      problemDetails,
      cause: "raw cause string",
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ApiError");
    expect(error.message).toBe("Verfahren update failed");
    expect(error.status).toBe(409);
    expect(error.problemDetails).toBe(problemDetails);
    expect(error.cause).toBe("raw cause string");
  });

  it("allows problemDetails to be undefined when the body could not be parsed", () => {
    const error = new ApiError("Request failed", { status: 500 });

    expect(error.problemDetails).toBeUndefined();
  });
});

describe("isApiError", () => {
  it("returns true for `ApiError` instances", () => {
    const error = new ApiError("", { status: 500 });
    expect(isApiError(error)).toBe(true);
  });

  it("returns false for other values", () => {
    expect(isApiError(new Error())).toBe(false);
    expect(isApiError("something else")).toBe(false);
  });
});

describe("isClientSideApiError", () => {
  it("returns true for `ApiError` instances with HTTP 4xx status", () => {
    const error = new ApiError("", { status: 409 });
    expect(isClientSideApiError(error)).toBe(true);
  });

  it("returns false for `ApiError` instances with HTTP 5xx status", () => {
    const error = new ApiError("", { status: 500 });
    expect(isClientSideApiError(error)).toBe(false);
  });

  it("returns false for other values", () => {
    expect(isClientSideApiError(new Error())).toBe(false);
    expect(isClientSideApiError("something else")).toBe(false);
  });
});
