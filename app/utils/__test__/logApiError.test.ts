import { describe, expect, it, vi } from "vitest";
import { ApiError } from "../apiError";
import { logApiErrorAndThrow, logParsingErrorAndThrow } from "../logApiError";

describe("logApiError", () => {
  it("logs response body and throws an error for non-ok responses", async () => {
    const response = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      url: "https://api.test/endpoint",
      clone: vi.fn().mockReturnValue({
        text: vi.fn().mockResolvedValue("error payload"),
      }),
    } as unknown as Response;

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(logApiErrorAndThrow(response, "Test error")).rejects.toThrow(
      "Test error",
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "[API Error] Test error",
      expect.objectContaining({
        status: 500,
        statusText: "Internal Server Error",
        url: "https://api.test/endpoint",
        body: "error payload",
      }),
    );

    errorSpy.mockRestore();
  });

  it("throws an ApiError carrying the status and parsed problem details", async () => {
    const problemDetailsBody = {
      title: "Conflict",
      status: 409,
      detail: "Die Ressource wurde zwischenzeitlich geaendert.",
    };
    const response = {
      ok: false,
      status: 409,
      statusText: "Conflict",
      url: "https://api.test/endpoint",
      clone: vi.fn().mockReturnValue({
        text: vi.fn().mockResolvedValue(JSON.stringify(problemDetailsBody)),
      }),
    } as unknown as Response;

    vi.spyOn(console, "error").mockImplementation(() => {});

    const error = await logApiErrorAndThrow(response, "Update failed").catch(
      (thrown) => thrown,
    );

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(409);
    expect((error as ApiError).problemDetails).toEqual(problemDetailsBody);

    vi.restoreAllMocks();
  });

  it("throws an ApiError with undefined problemDetails when the body isn't JSON", async () => {
    const response = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      url: "https://api.test/endpoint",
      clone: vi.fn().mockReturnValue({
        text: vi.fn().mockResolvedValue("not json"),
      }),
    } as unknown as Response;

    vi.spyOn(console, "error").mockImplementation(() => {});

    const error = await logApiErrorAndThrow(response, "Update failed").catch(
      (thrown) => thrown,
    );

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).problemDetails).toBeUndefined();

    vi.restoreAllMocks();
  });

  it("uses fallback body when response clone fails", async () => {
    const response = {
      ok: false,
      status: 400,
      statusText: "Bad Request",
      url: "https://api.test/endpoint",
      clone: vi.fn().mockImplementation(() => {
        throw new Error("clone failed");
      }),
    } as unknown as Response;

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(logApiErrorAndThrow(response, "Test error")).rejects.toThrow(
      "Test error",
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "[API Error] Test error",
      expect.objectContaining({
        body: "[Unable to read response body]",
      }),
    );

    errorSpy.mockRestore();
  });

  it("logs parsing error and rethrows the original error", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const originalError = new Error("bad parse");

    expect(() =>
      logParsingErrorAndThrow(originalError, "Parse failed", "raw body"),
    ).toThrow("Parse failed");

    expect(errorSpy).toHaveBeenCalledWith(
      "[Parsing Error] Parse failed",
      expect.objectContaining({
        responseBody: "raw body",
        error: originalError,
      }),
    );

    errorSpy.mockRestore();
  });
});
