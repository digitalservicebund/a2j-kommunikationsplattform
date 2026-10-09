import { data } from "react-router";
import z from "zod";
import de from "~/services/translations/de";
import { ApiError } from "~/utils/apiError";
import { logger } from "~/utils/logger.server";

export type ActionResult<T = undefined> =
  | ActionSuccessResult<T>
  | ActionInvalidResult<T>
  | ActionErrorResult<T>;

export type ActionSuccessResult<T = undefined> = {
  status: "success";
  data: T;
};

export type ActionInvalidResult<T = undefined> = {
  status: "invalid";
  fieldErrors: Record<string, string[]>;
  data?: T;
};

export type ActionErrorResult<T = undefined> = {
  status: "error";
  error: string;
  data?: T;
};

export function actionSuccess<T>(resultData: T): ActionSuccessResult<T> {
  return { status: "success", data: resultData };
}

export function actionInvalid<T = undefined>(
  fieldErrors: Record<string, string[]>,
  options?: { data?: T },
): ActionInvalidResult<T> {
  return { status: "invalid", fieldErrors, ...options };
}

export function actionError<T = undefined>(
  error: string,
  options?: { data?: T },
): ActionErrorResult<T> {
  return { status: "error", error, ...options };
}

export function actionErrorResponse<T = undefined>(
  error: string,
  options: { data?: T; status: number },
) {
  return data(actionError(error, { data: options.data }), {
    status: options.status,
  });
}

export function actionFieldErrorsResponse<T = undefined>(
  error: z.ZodError,
  options?: { data?: T },
) {
  return data(actionInvalid(z.flattenError(error).fieldErrors, options), {
    status: 400,
  });
}

function actionResultFromUnknownError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  // If we get here, something threw that wasn't an ApiError (or was an
  // ApiError in a context where that's not expected) — log it so it isn't
  // silently swallowed; the client only ever sees the generic message.
  logger.error({ error }, "Unexpected action error");

  return data(
    actionError(options?.message ?? de.shared.form.errors.unknown, {
      data: options?.data,
    }),
    { status: 500 },
  );
}
export function actionResultFromApiError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  if (error instanceof ApiError) {
    return data(
      actionError(options?.message ?? error.message, { data: options?.data }),
      { status: error.status },
    );
  }

  return actionResultFromUnknownError(error, options);
}

export function actionResultFromInputParsingError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  if (error instanceof z.ZodError) {
    return actionFieldErrorsResponse(error, { data: options?.data });
  }

  return actionResultFromUnknownError(error, options);
}

export function actionResultFromSchemaParsingError<T = undefined>(
  error: unknown,
  options?: { data?: T; message?: string },
) {
  return actionResultFromUnknownError(error, options);
}
