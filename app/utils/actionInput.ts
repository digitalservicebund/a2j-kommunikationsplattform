import { ZodType } from "zod";
import { actionResultFromInputParsingError } from "./actionResult";

type ActionInputSafeParseResult<T, I> =
  | {
      success: true;
      data: T;
      input: I;
    }
  | {
      success: false;
      error: ReturnType<typeof actionResultFromInputParsingError<{ input: I }>>;
      input: I;
    };

/**
 * Parses input passed to an action using the given schema. If the input is
 * invalid, `actionResultFromInputParsingError(error)` is thrown to return
 * a 400 error to the client. The original input is attached to the error
 * as `input` for convenience.
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
export function parseActionInput<T>(input: unknown, schema: ZodType<T>): T {
  try {
    return schema.parse(input);
  } catch (error) {
    throw actionResultFromInputParsingError(error, {
      data: { input },
    });
  }
}

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
export function safeParseActionInput<I, T>(
  input: I,
  schema: ZodType<T>,
): ActionInputSafeParseResult<T, I> {
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
          data: { input },
        }),
        input,
      };
}

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
): T {
  const input = Object.fromEntries(formData.entries());
  return parseActionInput(input, schema);
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
): ActionInputSafeParseResult<T, Record<string, FormDataEntryValue>> {
  const input = Object.fromEntries(formData.entries());
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
          data: { input },
        }),
        input,
      };
}
