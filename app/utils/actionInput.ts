import { ZodType } from "zod";
import { actionResultFromInputParsingError } from "./actionResult";

export type ActionInputParseOptions<ED extends object = {}> = {
  errorResultData?: ED;
};

/**
 * Parses input passed to an action using the given schema. If the input is
 * invalid, `actionResultFromInputParsingError(error)` is thrown to return
 * a 400 response to the client.
 *
 * For convenience, the original input is attached to the error action data
 * as `input`. You can attach additional data using the `errorData` option.
 *
 * @example
 * ```ts
 * export async function action({ request }: Route.ActionArgs) {
 *   const input = await request.json();
 *   const { foo, bar } = parseActionInput(input, MyInputSchema);
 *   // ...
 * }
 * ```
 */
export function parseActionInput<T>(
  input: unknown,
  schema: ZodType<T>,
  options?: ActionInputParseOptions,
): T {
  try {
    return schema.parse(input);
  } catch (error) {
    throw actionResultFromInputParsingError(error, {
      data: { ...options?.errorResultData, input },
    });
  }
}

type ActionInputSafeParseResult<T, I, ED extends object = {}> =
  | {
      success: true;
      data: T;
      input: I;
    }
  | {
      success: false;
      error: ReturnType<
        typeof actionResultFromInputParsingError<{
          [K in keyof (Omit<ED, "input"> & { input: I })]: (Omit<
            ED,
            "input"
          > & { input: I })[K];
        }>
      >;
      input: I;
    };

/**
 * Like `parseActionInput()`, but instead of throwing on invalid input,
 * it returns an result object containing the error (if any), like Zod's
 * `.safeParse()`. In addition, the result includes an object with the
 * original input form values as `input`.
 *
 * Use this if you want the input error to become part of the action's return
 * type so that its details can be retrieved as `actionData`.
 *
 * @example
 * ```ts
 * export async function action({ request }: Route.ActionArgs) {
 *   const input = await request.json();
 *   const parsedInput = safeParseActionInput(input, MyFormDataSchema);
 *   if (!parsedInput.success) return parsed.error
 *
 *   const { foo, bar } = parsedInput.data
 *
 *   // ...
 * }
 * ```
 */
export function safeParseActionInput<T, I>(
  input: I,
  schema: ZodType<T>,
): ActionInputSafeParseResult<T, I>;
export function safeParseActionInput<T, I, ED extends object>(
  input: I,
  schema: ZodType<T>,
  options: ActionInputParseOptions<ED>,
): ActionInputSafeParseResult<T, I, ED>;
export function safeParseActionInput<T, I, ED extends object>(
  input: I,
  schema: ZodType<T>,
  options?: ActionInputParseOptions<ED>,
): ActionInputSafeParseResult<T, I, ED | {}>;
export function safeParseActionInput<T, I, ED extends object = {}>(
  input: I,
  schema: ZodType<T>,
  options?: ActionInputParseOptions<ED>,
): ActionInputSafeParseResult<T, I, ED | {}> {
  const result = schema.safeParse(input);
  return result.success
    ? {
        success: true,
        data: result.data,
        input,
      }
    : {
        success: false,
        error: actionResultFromInputParsingError(result.error, {
          data: { ...options?.errorResultData, input },
        }),
        input,
      };
}

export type FormEntriesObject = Record<string, FormDataEntryValue>;

/**
 * A convenience wrapper for {@link parseActionInput} that automatically
 * extracts the input data from a `FormData` instance.
 *
 * @example
 * ```ts
 * export async function action({ request }: Route.ActionArgs) {
 *   const formData = await request.formData();
 *   const { foo, bar } = parseActionFormData(formData, MyFormDataSchema);
 *   // ...
 * }
 * ```
 */
export function parseActionFormData<T>(
  formData: FormData,
  schema: ZodType<T>,
  options?: ActionInputParseOptions,
): T {
  const input = Object.fromEntries(formData.entries());
  return parseActionInput(input, schema, options);
}

/**
 * A convenience wrapper for {@link safeParseActionInput} that automatically
 * extracts the input data from a `FormData` instance.
 *
 * __NOTE:__ From a typing perspective, this function has the downside that it
 * cannot infer a precise type for the returned `input` because the shape of
 * the `FormData` contents is not known until runtime. In case this is a
 * problem, use {@link safeParseActionInput} with an explicitly created form
 * values object instead:
 *
 * ```ts
 * const parsed = safeParseActionFormData({
 *   foo: formData.get("foo") ?? undefined,
 *   bar: formData.get("bar") ?? undefined,
 * }, MyFormDataSchema);
 * ```
 *
 * (Using `?? undefined` is recommended if you want to use Zod's `.default()`,
 * which is only applies to `undefined` values, not to the `null` returned by
 * `FormData.get` on missing keys.)
 *
 * @example
 * ```ts
 * export async function action({ request }: Route.ActionArgs) {
 *   const formData = await request.formData();
 *   const parsed = safeParseActionFormData(formData, MyFormDataSchema);
 *   if (!parsed.success) return parsed.error
 *
 *   const { foo, bar } = parse.data
 *
 *   // ...
 * }
 * ```
 */
export function safeParseActionFormData<T>(
  formData: FormData,
  schema: ZodType<T>,
): ActionInputSafeParseResult<T, FormEntriesObject>;
export function safeParseActionFormData<T, ED extends object>(
  formData: FormData,
  schema: ZodType<T>,
  options: ActionInputParseOptions<ED>,
): ActionInputSafeParseResult<T, FormEntriesObject, ED>;
export function safeParseActionFormData<T, ED extends object>(
  formData: FormData,
  schema: ZodType<T>,
  options?: ActionInputParseOptions<ED>,
): ActionInputSafeParseResult<T, FormEntriesObject, ED | {}>;
export function safeParseActionFormData<T, ED extends object = {}>(
  formData: FormData,
  schema: ZodType<T>,
  options?: ActionInputParseOptions<ED>,
): ActionInputSafeParseResult<T, FormEntriesObject, ED | {}> {
  const input = Object.fromEntries(formData.entries());
  return safeParseActionInput(input, schema, options);
}
