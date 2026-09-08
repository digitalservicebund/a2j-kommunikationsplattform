import { describe, expect, it } from "vitest";
import { parseProblemDetails } from "../problemDetails.schema";

describe("parseProblemDetails", () => {
  it("parses a ProblemDetails body", () => {
    const body = {
      type: "https://example.com/probs/conflict",
      title: "Conflict",
      status: 409,
      detail: "Die Ressource wurde zwischenzeitlich geaendert.",
      instance: "/api/v1/verfahren/123",
    };

    expect(parseProblemDetails(body)).toEqual(body);
  });

  it("parses a ValidationProblemDetails body including the errors map", () => {
    const body = {
      title: "Validation failed",
      status: 400,
      errors: {
        kurzrubrum: ["Feld darf nicht leer sein."],
      },
    };

    expect(parseProblemDetails(body)).toEqual(body);
  });

  it("returns undefined for a non-object body", () => {
    expect(parseProblemDetails("plain text error")).toBeUndefined();
    expect(parseProblemDetails(undefined)).toBeUndefined();
    expect(parseProblemDetails(null)).toBeUndefined();
  });

  it("returns undefined when errors has the wrong shape", () => {
    expect(parseProblemDetails({ errors: "not a map" })).toBeUndefined();
  });

  it("parses an empty object, since every field is optional per the spec", () => {
    expect(parseProblemDetails({})).toEqual({});
  });
});
