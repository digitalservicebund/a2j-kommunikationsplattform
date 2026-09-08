import z from "zod";

/**
 * RFC 7807 problem+json shape used for every documented error response
 * (400/401/403/404/409/412/413/415/428/500) in the KOMPLA OpenAPI spec.
 * All fields are optional per the spec itself.
 */
export const ProblemDetailsSchema = z
  .object({
    type: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    status: z.number().int().nullable().optional(),
    detail: z.string().nullable().optional(),
    instance: z.string().nullable().optional(),
  })
  .loose();

export type ProblemDetails = z.infer<typeof ProblemDetailsSchema>;

/**
 * 400 responses extend ProblemDetails with a field -> messages map.
 */
export const ValidationProblemDetailsSchema = ProblemDetailsSchema.extend({
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type ValidationProblemDetails = z.infer<
  typeof ValidationProblemDetailsSchema
>;

export function parseProblemDetails(
  body: unknown,
): ValidationProblemDetails | undefined {
  const result = ValidationProblemDetailsSchema.safeParse(body);
  return result.success ? result.data : undefined;
}
