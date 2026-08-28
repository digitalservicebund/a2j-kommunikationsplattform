import z from "zod";
import {
  EinreichenResponse,
  Einreichung,
  EinreichungErstellenResponse,
  EinreichungStatusSchema,
} from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { ValidierungslaufStatusSchema } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { getListeResponseSchema } from "~/domains/verfahren/infrastructure/api/listResponse";

/**
 * EinreichungApiSchema
 *
 * Raw API contract (snake_case). See Einreichung Schema at:
 * https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
const EinreichungApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  erstellt_von: z.string(),
  erstellt_am: z.string(),
  status: EinreichungStatusSchema,
  beantragt_am: z.nullable(z.string()),
  gesendet_am: z.nullable(z.string()),
  eingereicht_am: z.nullable(z.string()),
  validierungs_status: ValidierungslaufStatusSchema,
});

export const EinreichungSchema = EinreichungApiSchema.transform(
  (dto): Einreichung => ({
    id: dto.id,
    name: dto.name,
    erstelltVon: dto.erstellt_von,
    erstelltAm: dto.erstellt_am,
    status: dto.status,
    beantragtAm: dto.beantragt_am,
    gesendetAm: dto.gesendet_am,
    eingereichtAm: dto.eingereicht_am,
    validierungsStatus: dto.validierungs_status,
  }),
);

export const EinreichungenSchema = getListeResponseSchema(EinreichungSchema);

/**
 * EinreichungErstellenResponseApiSchema
 *
 * Raw API contract (snake_case) for the response of creating an Einreichung.
 * Narrower than EinreichungApiSchema — see EinreichungErstellenResponse in
 * the entity for why.
 */
const EinreichungErstellenResponseApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  erstellt_von: z.string(),
  erstellt_am: z.string(),
  status: EinreichungStatusSchema,
});

export const EinreichungErstellenResponseSchema =
  EinreichungErstellenResponseApiSchema.transform(
    (dto): EinreichungErstellenResponse => ({
      id: dto.id,
      name: dto.name,
      erstelltVon: dto.erstellt_von,
      erstelltAm: dto.erstellt_am,
      status: dto.status,
    }),
  );

/**
 * EinreichenResponseApiSchema
 *
 * Response of the "Einreichen" action, see:
 * https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
const EinreichenResponseApiSchema = z.object({
  beleg_id: z.string(),
});

export const EinreichenResponseSchema = EinreichenResponseApiSchema.transform(
  (dto): EinreichenResponse => ({
    belegId: dto.beleg_id,
  }),
);
