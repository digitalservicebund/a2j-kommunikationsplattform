export type FormActionHandler<TContext> = (
  formData: FormData,
  context: TContext,
) => unknown;

/**
 * Looks up the handler registered for formData's "formType" and invokes it,
 * falling back to `onUnmatchedHandlerKey` when there is no matching handler.
 */
export function dispatchFormAction<
  TContext,
  THandlers extends Record<string, FormActionHandler<TContext>>,
  TFallback,
>(
  formData: FormData,
  handlers: THandlers,
  context: TContext,
  onUnmatchedHandlerKey: () => TFallback,
): ReturnType<THandlers[keyof THandlers]> | TFallback {
  const formType = formData.get("formType");

  const handlerKey =
    typeof formType === "string" && formType in handlers
      ? (formType as keyof THandlers)
      : null;

  if (!handlerKey) {
    return onUnmatchedHandlerKey();
  }

  // The TypeScript compiler infers the type of `handlers[handlerKey]` as
  // `unknown` while it clearly confirms to `ReturnType<THandlers[keyof THandlers]>`.
  // Hence the "unsafe" cast.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return handlers[handlerKey](formData, context) as ReturnType<
    THandlers[keyof THandlers]
  >;
}
