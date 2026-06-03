import z from "zod";

/**
 * EinreichungSchema
 *
 * See Einreichung Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const EinreichungSchema = z.object({
  id: z.string(),
  verfahren_id: z.string(),
  name: z.nullable(z.string()),
  erstellt_von: z.nullable(z.string()),
  erstellt_am: z.string(),
  status: z.enum(["ERSTELLT", "VALIDIERT", "EINGEREICHT"]),
  gesendet_am: z.nullable(z.string()),
  eingereicht_am: z.nullable(z.string()),
});

export const EinreichungenSchema = z.array(EinreichungSchema);
