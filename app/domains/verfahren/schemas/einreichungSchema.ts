import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { ValidierungslaufStatus } from "~/domains/verfahren/schemas/validierungsStatusSchema";

/**
 * EinreichungSchema
 *
 * See Einreichung Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const EinreichungSchema = z.object({
  id: z.string(),
  name: z.string(),
  erstellt_von: z.string(),
  erstellt_am: z.string(),
  status: z.enum([
    "ERSTELLT",
    "EINGEREICHT",
    "FEHLGESCHLAGEN",
    "BEANTRAGT",
    "VERSENDET",
    "VERAKTET",
    "GELOESCHT",
  ]),
  beantragt_am: z.nullable(z.string()),
  gesendet_am: z.nullable(z.string()),
  eingereicht_am: z.nullable(z.string()),
  validierungs_status: ValidierungslaufStatus,
});

export const EinreichungenSchema = getListeResponseSchema(EinreichungSchema);
