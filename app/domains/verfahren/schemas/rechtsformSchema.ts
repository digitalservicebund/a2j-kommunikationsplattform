import z from "zod";

/**
 * RechtsformSchema
 *
 * See Rechtsform Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
export const RechtsformSchema = z.object({
  id: z.string().optional(),
  wert: z.string(),
  code: z.string(),
});
