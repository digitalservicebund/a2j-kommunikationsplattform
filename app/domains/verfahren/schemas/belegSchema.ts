import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";

/**
 * BelegSchema
 *
 * See Beleg Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const BelegTypSchema = z.enum(["PROTOKOLL", "NACHWEIS"]);

export const BelegStatusSchema = z.enum(["IN_BEARBEITUNG", "ERSTELLT"]);

export const ContentDispositionTypeSchema = z.enum(["INLINE", "ATTACHMENT"]);

export const BelegSchema = z.object({
  id: z.string(),
  erstellt_am: z.string(),
  typ: BelegTypSchema.optional(),
  status: BelegStatusSchema,
  einreichung_id: z.string().optional(),
  anzeigename: z.nullable(z.string()).optional(),
  dateiname: z.nullable(z.string()),
  content_type: z.nullable(z.string()),
  size_in_bytes: z.nullable(z.number()).optional(),
});

export const BelegeSchema = getListeResponseSchema(BelegSchema);
