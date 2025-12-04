import z from "zod";

/**
 * VerfahrenSchema
 *
 * See Verfahren Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
export const VerfahrenSchema = z.object({
  id: z.uuid(),
  aktenzeichen_gericht: z.nullable(z.string()),
  status: z.enum(["Erstellt", "Eingereicht"]),
  status_changed: z.iso.datetime(),
  eingereicht_am: z.nullable(z.iso.datetime()),
  gericht: z.nullable(
    z.object({
      id: z.guid(),
      wert: z.string(),
      code: z.string(),
    }),
  ),
  beteiligungen: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      rollen: z.array(
        z.object({
          id: z.guid(),
          wert: z.string(),
          code: z.string(),
        }),
      ),
      prozessbevollmaechtigte: z.array(
        z.object({
          aktenzeichen: z.string(),
          bevollmaechtigter: z.object({
            id: z.uuid(),
            safe_id: z.string(),
            name: z.string(),
          }),
        }),
      ),
    }),
  ),
});
