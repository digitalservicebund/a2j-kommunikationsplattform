import { z } from "zod";

/**
 * Creates a Zod codec that parses a JSON string using the given example.
 *
 * @example
 *
 * ```ts
 * import assert from "node:assert";
 *
 * const Example = z.object({
 *   foo: z.string(),
 *  });
 *
 * const ExampleWrapper = z.object({
 *   example: jsonCodec(Example),
 * });
 *
 * const input = { example: '{ "foo": "bar" }' };
 * const output = ExampleWrapper.parse(input);
 *
 * assert.deepStrictEquals(output, { example: { foo: "bar" } });
 * ```
 *
 * @see https://zod.dev/codecs#jsonschema
 *
 */
export function jsonCodec<T extends z.core.$ZodType>(
  schema: T,
): z.ZodCodec<z.ZodString, T> {
  return z.codec(z.string(), schema, {
    decode: (jsonString, ctx) => {
      try {
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        return JSON.parse(jsonString) as any;
      } catch (err: any) {
        ctx.issues.push({
          code: "invalid_format",
          format: "json",
          input: jsonString,
          message: err.message,
        });
        return z.NEVER;
      }
    },
    encode: (value) => JSON.stringify(value),
  });
}
