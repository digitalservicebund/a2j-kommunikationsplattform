import z from "zod";

/**
 * Status
 *
 * See Status Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const ValidationStatusSchema = z.enum(["GRUEN", "GELB", "ROT"]);

export const StatusSchema = z.object({
  status: ValidationStatusSchema,
  validation_messages: z.array(
    z.object({
      status: ValidationStatusSchema,
      message: z.nullable(z.string()),
    }),
  ),
});
