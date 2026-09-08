import z from "zod";
import { BeteiligungenSchema } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import {
  Verfahren,
  VerfahrenStatusSchema,
} from "~/domains/verfahren/entities/verfahren/verfahren.entity";

/**
 * VerfahrenApiSchema
 *
 * Raw API contract (snake_case). See Verfahren Schema at:
 * https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
const VerfahrenApiSchema = z.object({
  id: z.string(),
  aktenzeichen_gericht: z.nullable(z.string()),
  verfahrensgegenstand: z.nullable(z.string()),
  kurzrubrum: z.nullable(z.string()),
  status: VerfahrenStatusSchema,
  status_geaendert_am: z.iso.datetime(),
  erstellt_von: z.string(),
  erstellt_am: z.iso.datetime(),
  eingereicht_am: z.nullable(z.iso.datetime()),
  gericht: CodeWertSchema,
  beteiligungen: BeteiligungenSchema,
});

export const VerfahrenSchema = VerfahrenApiSchema.transform(
  (dto): Verfahren => ({
    id: dto.id,
    aktenzeichenGericht: dto.aktenzeichen_gericht,
    verfahrensgegenstand: dto.verfahrensgegenstand,
    kurzrubrum: dto.kurzrubrum,
    status: dto.status,
    statusGeaendertAm: dto.status_geaendert_am,
    erstelltVon: dto.erstellt_von,
    erstelltAm: dto.erstellt_am,
    eingereichtAm: dto.eingereicht_am,
    gericht: dto.gericht,
    beteiligungen: dto.beteiligungen,
  }),
);
