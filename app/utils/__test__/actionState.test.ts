import { describe, expect, it, vi } from "vitest";
import z from "zod";
import de from "~/services/translations/de";
import {
  actionError,
  actionFieldErrorsResponse,
  actionInvalid,
  actionResultFromApiError,
  actionResultFromInputParsingError,
  actionResultFromSchemaParsingError,
  actionSuccess,
} from "../actionResult";
import { ApiError } from "../apiError";

describe("actionSuccess", () => {
  it("returns a success ActionResult carrying the given data", () => {
    expect(actionSuccess({ id: "v-1" })).toEqual({
      status: "success",
      data: { id: "v-1" },
    });
  });
});

describe("actionInvalid", () => {
  it("returns an invalid ActionResult with the given field errors", () => {
    expect(actionInvalid({ name: ["Pflichtfeld"] })).toEqual({
      status: "invalid",
      fieldErrors: { name: ["Pflichtfeld"] },
    });
  });

  it("attaches optional data alongside the field errors", () => {
    expect(
      actionInvalid(
        { name: ["Pflichtfeld"] },
        { data: { formType: "submit" } },
      ),
    ).toEqual({
      status: "invalid",
      fieldErrors: { name: ["Pflichtfeld"] },
      data: { formType: "submit" },
    });
  });
});

describe("actionError", () => {
  it("returns an error ActionResult with the given message", () => {
    expect(actionError("Löschen fehlgeschlagen.")).toEqual({
      status: "error",
      error: "Löschen fehlgeschlagen.",
    });
  });

  it("attaches optional data alongside the error message", () => {
    expect(
      actionError("Löschen fehlgeschlagen.", {
        data: { verfahrenId: "v-1" },
      }),
    ).toEqual({
      status: "error",
      error: "Löschen fehlgeschlagen.",
      data: { verfahrenId: "v-1" },
    });
  });
});

describe("actionFieldErrorsResponse", () => {
  it("flattens a ZodError into field errors and returns a 400 response", () => {
    const schema = z.object({ name: z.string().min(1) });
    const result = schema.safeParse({ name: "" });
    if (result.success) throw new Error("expected validation to fail");

    const response = actionFieldErrorsResponse(result.error, {
      data: { formType: "submit" },
    });

    expect(response.init).toEqual({ status: 400 });
    expect(response.data).toEqual({
      status: "invalid",
      fieldErrors: { name: expect.any(Array) },
      data: { formType: "submit" },
    });
  });
});

describe("actionResultFromApiError", () => {
  it("uses the ApiError's own status and message when no override is given", () => {
    const error = new ApiError("Fehler beim Bearbeiten des Verfahrens.", {
      status: 409,
    });

    const response = actionResultFromApiError(error);

    expect(response.init).toEqual({ status: 409 });
    expect(response.data).toEqual({
      status: "error",
      error: "Fehler beim Bearbeiten des Verfahrens.",
    });
  });

  it("prefers the provided message and data over the ApiError's own message", () => {
    const error = new ApiError("Fehler beim Bearbeiten des Verfahrens.", {
      status: 400,
    });

    const response = actionResultFromApiError(error, {
      message: de.shared.form.errors.saveFailed,
      data: { formType: "submit" },
    });

    expect(response.init).toEqual({ status: 400 });
    expect(response.data).toEqual({
      status: "error",
      error: de.shared.form.errors.saveFailed,
      data: { formType: "submit" },
    });
  });

  it("logs and falls back to a generic 500 error for a non-ApiError", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("boom");

    const response = actionResultFromApiError(error, {
      data: { formType: "submit" },
    });

    expect(response.init).toEqual({ status: 500 });
    expect(response.data).toEqual({
      status: "error",
      error: de.shared.form.errors.unknown,
      data: { formType: "submit" },
    });
    expect(errorSpy).toHaveBeenCalledWith("[Unexpected action error]", error);

    errorSpy.mockRestore();
  });
});

describe("actionResultFromInputParsingError", () => {
  it("flattens a ZodError into a 400 field errors response", () => {
    const schema = z.object({ email: z.string().min(1) });
    const result = schema.safeParse({ email: "" });
    if (result.success) throw new Error("expected validation to fail");

    const response = actionResultFromInputParsingError(result.error, {
      data: { formType: "submit" },
    });

    expect(response.init).toEqual({ status: 400 });
    expect(response.data).toEqual({
      status: "invalid",
      fieldErrors: { email: expect.any(Array) },
      data: { formType: "submit" },
    });
  });

  it("logs and falls back to a generic 500 error for a non-ZodError", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("not a zod error");

    const response = actionResultFromInputParsingError(error);

    expect(response.init).toEqual({ status: 500 });
    expect(response.data).toEqual({
      status: "error",
      error: de.shared.form.errors.unknown,
    });

    errorSpy.mockRestore();
  });
});

describe("actionResultFromSchemaParsingError", () => {
  it("always logs and falls back to a generic 500 error", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("schema parsing failed");

    const response = actionResultFromSchemaParsingError(error, {
      message: "Die Klage konnte nicht gespeichert werden.",
      data: { formType: "submit" },
    });

    expect(response.init).toEqual({ status: 500 });
    expect(response.data).toEqual({
      status: "error",
      error: "Die Klage konnte nicht gespeichert werden.",
      data: { formType: "submit" },
    });
    expect(errorSpy).toHaveBeenCalledWith("[Unexpected action error]", error);

    errorSpy.mockRestore();
  });
});
