import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  FormEntriesObject,
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

  it("allows attaching extra data to the action-invalid result", () => {
    const input = {
      foo: "",
      bar: "not a number",
    };
    const errorResultData = {
      extra: "stuff",
    };

    const { error: expectedZodError } = ExampleInputSchema.safeParse(input);

    expect(() =>
      parseActionInput(input, ExampleInputSchema, { errorResultData }),
    ).toThrow(
      actionResultFromInputParsingError(expectedZodError, {
        data: {
          input,
          extra: "stuff",
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

    if (!result.success) {
      expectTypeOf(result.error.data.data!).toExtend<{
        input: { foo: string; bar: string };
      }>();
    }
  });

  it("allows attaching extra data to the action-invalid result", () => {
    const input = {
      foo: "",
      bar: "not a number",
    };
    const errorResultData = {
      extra: "stuff",
    };

    const { error: expectedZodError } = ExampleInputSchema.safeParse(input);
    const result = safeParseActionInput(input, ExampleInputSchema, {
      errorResultData,
    });

    expect(result).toEqual({
      success: false,
      error: actionResultFromInputParsingError(expectedZodError, {
        data: { input, extra: "stuff" },
      }),
      input,
    });

    if (!result.success) {
      expectTypeOf(result.error.data.data!).toExtend<{
        input: { foo: string; bar: string };
        extra: string;
      }>();
    }
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

    const { error: expectedZodError } = ExampleInputSchema.safeParse({
      foo: formData.get("foo"),
      bar: formData.get("bar"),
    });

    expect(() => parseActionFormData(formData, ExampleInputSchema)).toThrow(
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

  it("allows attaching extra data to the action-invalid result", () => {
    const formData = new FormData();
    formData.append("foo", "");
    formData.append("bar", "not a number");

    const errorResultData = {
      extra: "stuff",
    };

    const { error: expectedZodError } = ExampleInputSchema.safeParse({
      foo: formData.get("foo"),
      bar: formData.get("bar"),
    });

    expect(() =>
      parseActionFormData(formData, ExampleInputSchema, { errorResultData }),
    ).toThrow(
      actionResultFromInputParsingError(expectedZodError, {
        data: {
          input: {
            foo: "",
            bar: "not a number",
          },
          extra: "stuff",
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

    const { error: expectedZodError } = ExampleInputSchema.safeParse({
      foo: formData.get("foo"),
      bar: formData.get("bar"),
    });

    const result = safeParseActionFormData(formData, ExampleInputSchema);

    expect(result).toEqual({
      success: false,
      error: actionResultFromInputParsingError(expectedZodError, {
        data: { input: { foo: "", bar: "not a number" } },
      }),
      input: { foo: "", bar: "not a number" },
    });
  });

  it("allows attaching extra data to the action-invalid result", () => {
    const formData = new FormData();
    formData.append("foo", "");
    formData.append("bar", "not a number");

    const errorResultData = {
      extra: "stuff",
    };

    const { error: expectedZodError } = ExampleInputSchema.safeParse({
      foo: formData.get("foo"),
      bar: formData.get("bar"),
    });

    const result = safeParseActionFormData(formData, ExampleInputSchema, {
      errorResultData,
    });

    expect(result).toEqual({
      success: false,
      error: actionResultFromInputParsingError(expectedZodError, {
        data: {
          input: {
            foo: "",
            bar: "not a number",
          },
          extra: "stuff",
        },
      }),
      input: {
        foo: "",
        bar: "not a number",
      },
    });

    if (!result.success) {
      expectTypeOf(result.error.data.data!).toExtend<{
        input: FormEntriesObject;
        extra: string;
      }>();
    }
  });
});
