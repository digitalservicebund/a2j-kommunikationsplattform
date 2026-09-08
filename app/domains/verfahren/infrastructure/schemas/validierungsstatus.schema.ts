import z from "zod";
import {
  ValidierungslaufStatusSchema,
  Validierungsstatus,
} from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";

/**
 * ValidierungsstatusApiSchema
 *
 * Raw API contract (snake_case). See Validierungsstatus Schema at:
 * https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
const ValidierungsstatusApiSchema = z.object({
  validierungslauf_status: ValidierungslaufStatusSchema,
  ergebnis: z.enum(["NICHT_VERFUEGBAR", "GRUEN", "GELB", "ROT"]),
  fehler: z.array(z.string()),
});

export const ValidierungsstatusSchema = ValidierungsstatusApiSchema.transform(
  (dto): Validierungsstatus => ({
    validierungslaufStatus: dto.validierungslauf_status,
    ergebnis: dto.ergebnis,
    fehler: dto.fehler,
  }),
);
