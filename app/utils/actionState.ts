import { data } from "react-router";
import z from "zod";
import { ApiError } from "~/utils/apiError";

export type ActionState<T = undefined> =
  | { status: "success"; data: T }
  | { status: "invalid"; fieldErrors: Record<string, string[]>; data?: T }
  | { status: "error"; error: string; data?: T };

export function actionSuccess<T>(data: T): ActionState<T> {
  return { status: "success", data };
}

export function actionInvalid<T = undefined>(
  fieldErrors: Record<string, string[]>,
  options?: { data?: T },
): ActionState<T> {
  return { status: "invalid", fieldErrors, ...options };
}

export function actionError<T = undefined>(
  error: string,
  options?: { data?: T },
): ActionState<T> {
  return { status: "error", error, ...options };
}

export function actionFieldErrorsResponse<T = undefined>(
  error: z.ZodError,
  options?: { data?: T },
) {
  return data(actionInvalid(z.flattenError(error).fieldErrors, options), {
    status: 400,
  });
}

function actionStateFromUnknownError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  // If we get here, something threw that wasn't an ApiError (or was an
  // ApiError in a context where that's not expected) — log it so it isn't
  // silently swallowed; the client only ever sees the generic message.
  console.error("[Unexpected action error]", error);

  return data(
    actionError(options?.message ?? "Ein unbekannter Fehler ist aufgetreten.", {
      data: options?.data,
    }),
    { status: 500 },
  );
}
export function actionStateFromApiError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  if (error instanceof ApiError) {
    return data(
      actionError(options?.message ?? error.message, { data: options?.data }),
      { status: error.status },
    );
  }

  return actionStateFromUnknownError(error, options);
}

export function actionStateFromInputParsingError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  if (error instanceof z.ZodError) {
    return actionFieldErrorsResponse(error, { data: options?.data });
  }

  return actionStateFromUnknownError(error, options);
}

export function actionStateFromSchemaParsingError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  return actionStateFromUnknownError(error, options);
}
