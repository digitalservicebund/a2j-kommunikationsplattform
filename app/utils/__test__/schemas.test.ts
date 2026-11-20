import { describe, expect, it } from "vitest";
import { z } from "zod";
import { jsonCodec } from "../schemas";

const Example = z.object({
  foo: z.string(),
});

const ExampleWrapper = z.object({
  example: jsonCodec(Example),
});

describe(jsonCodec, () => {
  describe("decode", () => {
    it("parses a JSON string into a value matching the schema", () => {
      const codec = jsonCodec(Example);
      expect(codec.parse('{ "foo": "bar" }')).toEqual({ foo: "bar" });
    });

    it("parses a JSON string nested in an object schema", () => {
      const output = ExampleWrapper.parse({ example: '{ "foo": "bar" }' });
      expect(output).toEqual({ example: { foo: "bar" } });
    });

    it("applies transformations of the inner schema", () => {
      const codec = jsonCodec(z.object({ count: z.coerce.number() }));
      expect(codec.parse('{ "count": "42" }')).toEqual({ count: 42 });
    });

    it("reports an invalid_format issue for malformed JSON", () => {
      const result = jsonCodec(Example).safeParse("{ not json");
      expect(result.success).toBe(false);
      expect(result.error?.issues).toEqual([
        expect.objectContaining({
          code: "invalid_format",
          format: "json",
          message: expect.any(String),
        }),
      ]);
    });

    it("reports schema issues for valid JSON that does not match the schema", () => {
      const result = jsonCodec(Example).safeParse('{ "foo": 42 }');
      expect(result.success).toBe(false);
      expect(result.error?.issues).toEqual([
        expect.objectContaining({
          code: "invalid_type",
          path: ["foo"],
        }),
      ]);
    });

    it("reports the issue path relative to the enclosing schema", () => {
      const result = ExampleWrapper.safeParse({ example: "{ not json" });
      expect(result.success).toBe(false);
      expect(result.error?.issues).toEqual([
        expect.objectContaining({
          code: "invalid_format",
          path: ["example"],
        }),
      ]);
    });

    it("rejects non-string input", () => {
      const result = jsonCodec(Example).safeParse({ foo: "bar" });
      expect(result.success).toBe(false);
      expect(result.error?.issues).toEqual([
        expect.objectContaining({
          code: "invalid_type",
          expected: "string",
        }),
      ]);
    });
  });

  describe("encode", () => {
    it("serializes a value into a JSON string", () => {
      const codec = jsonCodec(Example);
      expect(codec.encode({ foo: "bar" })).toBe('{"foo":"bar"}');
    });

    it("round-trips a value through encode and decode", () => {
      const codec = jsonCodec(Example);
      const value = { foo: "bar" };
      expect(codec.decode(codec.encode(value))).toEqual(value);
    });

    it("rejects values that do not match the schema", () => {
      const codec = jsonCodec(Example);
      const invalid = { foo: 42 } as unknown as z.output<typeof Example>;
      expect(() => codec.encode(invalid)).toThrow(z.ZodError);
    });
  });
});
