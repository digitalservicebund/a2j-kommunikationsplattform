import { describe, expect, it } from "vitest";
import { ApiError } from "../apiError";

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
