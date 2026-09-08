import z from "zod";
import {
  Beleg,
  BelegStatusSchema,
  BelegTypSchema,
} from "~/domains/verfahren/entities/beleg/beleg.entity";
import { getListeResponseSchema } from "~/domains/verfahren/infrastructure/api/listResponse";

/**
 * BelegApiSchema
 *
 * Raw API contract (snake_case). See Beleg Schema at:
 * https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
const BelegApiSchema = z.object({
  id: z.string(),
  erstellt_am: z.string(),
  typ: z.nullish(BelegTypSchema),
  status: BelegStatusSchema,
  einreichung_id: z.string().optional(),
  anzeigename: z.nullable(z.string()).optional(),
  dateiname: z.nullable(z.string()),
  content_type: z.nullable(z.string()),
  size_in_bytes: z.nullable(z.number()).optional(),
});

export const BelegSchema = BelegApiSchema.transform((dto): Beleg => ({
  id: dto.id,
  erstelltAm: dto.erstellt_am,
  typ: dto.typ,
  status: dto.status,
  einreichungId: dto.einreichung_id,
  anzeigename: dto.anzeigename,
  dateiname: dto.dateiname,
  contentType: dto.content_type,
  sizeInBytes: dto.size_in_bytes,
}));

export const BelegeSchema = getListeResponseSchema(BelegSchema);
