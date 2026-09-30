import { describe, expect, test, vi } from "vitest";
import z from "zod";
import {
  extractElementeFromListeResponse,
  getListeResponseSchema,
} from "~/domains/verfahren/infrastructure/api/listResponse";
import { logger } from "~/utils/logger.server";

vi.mock("~/utils/logger.server", () => ({
  logger: { error: vi.fn() },
}));

const ElementSchema = z.object({ id: z.string(), wert: z.string() });

describe("getListeResponseSchema", () => {
  const schema = getListeResponseSchema(ElementSchema);

  test("parses a valid liste response", () => {
    const result = schema.parse({
      list_version: "1",
      elemente: [{ id: "1", wert: "Landgericht Frankfurt" }],
    });

    expect(result).toEqual({
      list_version: "1",
      elemente: [{ id: "1", wert: "Landgericht Frankfurt" }],
    });
  });

  test("list_version is optional", () => {
    const result = schema.parse({
      elemente: [{ id: "1", wert: "Landgericht Frankfurt" }],
    });

    expect(result.list_version).toBeUndefined();
  });

  test("rejects elemente that don't match the element schema", () => {
    expect(() =>
      schema.parse({ list_version: "1", elemente: [{ id: "1" }] }),
    ).toThrow();
  });

  test("rejects a response missing elemente", () => {
    expect(() => schema.parse({ list_version: "1" })).toThrow();
  });
});

describe("extractElementeFromListeResponse", () => {
  test("returns the elemente array from a valid response", () => {
    const elemente = [{ id: "1", wert: "Landgericht Frankfurt" }];

    expect(extractElementeFromListeResponse({ elemente })).toBe(elemente);
  });

  test("returns an empty array and logs an error when the response is missing", () => {
    expect(
      extractElementeFromListeResponse(
        undefined as unknown as { elemente: unknown[] },
      ),
    ).toEqual([]);
    expect(logger.error).toHaveBeenCalledWith(
      { error: expect.anything() },
      "Error extracting Elemente from Liste response",
    );
  });
});
