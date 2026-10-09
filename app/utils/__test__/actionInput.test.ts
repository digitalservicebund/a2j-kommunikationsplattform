import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  parseActionFormData,
  parseActionInput,
  safeParseActionFormData,
  safeParseActionInput,
} from "../actionInput";
import { actionResultFromInputParsingError } from "../actionResult";

const ExampleInputSchema = z.object({
  foo: z.string().min(1),
  bar: z.preprocess(Number, z.number()),
});

describe(parseActionInput, () => {
  it("returns the parsed form data if valid", () => {
    const input = {
      foo: "something",
      bar: 123,
    };

    const result = parseActionInput(input, ExampleInputSchema);

    expect(result).toEqual({
      foo: "something",
      bar: 123,
    });
  });

  it("throws an action-invalid result if the form data is invalid", () => {
    const input = {
      foo: "",
      bar: "not a number",
    };

    const { error: expectedZodError } = ExampleInputSchema.safeParse(input);

    expect(() => parseActionInput(input, ExampleInputSchema)).toThrow(
      actionResultFromInputParsingError(expectedZodError, {
        data: {
          input: {
            foo: "",
            bar: "not a number",
          },
        },
      }),
    );
  });
});

describe(safeParseActionInput, () => {
  it("returns the parsed form data and original input if the form data valid", () => {
    const input = {
      foo: "something",
      bar: 123,
    };

    const result = safeParseActionInput(input, ExampleInputSchema);

    expect(result).toEqual({
      success: true,
      data: { foo: "something", bar: 123 },
      input,
    });
  });

  it("returns an action-invalid result if the form datais invalid", () => {
    const input = {
      foo: "",
      bar: "not a number",
    };

    const { error: expectedZodError } = ExampleInputSchema.safeParse(input);
    const result = safeParseActionInput(input, ExampleInputSchema);

    expect(result).toEqual({
      success: false,
      error: actionResultFromInputParsingError(expectedZodError, {
        data: { input: { foo: "", bar: "not a number" } },
      }),
      input: { foo: "", bar: "not a number" },
    });
  });
});

describe(parseActionFormData, () => {
  it("returns the parsed form data if valid", () => {
    const formData = new FormData();
    formData.append("foo", "something");
    formData.append("bar", "123");

    const result = parseActionFormData(formData, ExampleInputSchema);

    expect(result).toEqual({
      foo: "something",
      bar: 123,
    });
  });

  it("throws an action-invalid result if the form data is invalid", () => {
    const formData = new FormData();
    formData.append("foo", "");
    formData.append("bar", "not a number");

    const { error: zodError } = ExampleInputSchema.safeParse({
      foo: formData.get("foo"),
      bar: formData.get("bar"),
    });

    expect(() => parseActionFormData(formData, ExampleInputSchema)).toThrow(
      actionResultFromInputParsingError(zodError, {
        data: {
          input: {
            foo: "",
            bar: "not a number",
          },
        },
      }),
    );
  });
});

describe(safeParseActionFormData, () => {
  it("returns the parsed form data and original input if the form data valid", () => {
    const formData = new FormData();
    formData.append("foo", "something");
    formData.append("bar", "123");

    const result = safeParseActionFormData(formData, ExampleInputSchema);

    expect(result).toEqual({
      success: true,
      data: { foo: "something", bar: 123 },
      input: { foo: "something", bar: "123" },
    });
  });

  it("returns an action-invalid result if the form datais invalid", () => {
    const formData = new FormData();
    formData.append("foo", "");
    formData.append("bar", "not a number");

    const { error: zodError } = ExampleInputSchema.safeParse({
      foo: formData.get("foo"),
      bar: formData.get("bar"),
    });

    const result = safeParseActionFormData(formData, ExampleInputSchema);

    expect(result).toEqual({
      success: false,
      error: actionResultFromInputParsingError(zodError, {
        data: { input: { foo: "", bar: "not a number" } },
      }),
      input: { foo: "", bar: "not a number" },
    });
  });
});
