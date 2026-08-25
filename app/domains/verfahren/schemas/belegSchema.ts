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
  // The OpenAPI contract documents `typ` as optional-but-not-nullable, but
  // the API returns `typ: null` while a Beleg is still IN_BEARBEITUNG (its
  // Typ isn't determined until processing completes).
  // TODO:remove the nullable part after confirming it with SINC
  typ: z.nullish(BelegTypSchema),
  status: BelegStatusSchema,
  einreichung_id: z.string().optional(),
  anzeigename: z.nullable(z.string()).optional(),
  dateiname: z.nullable(z.string()),
  content_type: z.nullable(z.string()),
  size_in_bytes: z.nullable(z.number()).optional(),
});

export const BelegeSchema = getListeResponseSchema(BelegSchema);
