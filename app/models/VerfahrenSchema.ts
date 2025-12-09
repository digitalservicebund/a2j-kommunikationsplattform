import z from "zod";

/**
 * VerfahrenSchema
 *
 * See Verfahren Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const CodeWertSchema = z.object({
  id: z.guid(),
  wert: z.string(),
  code: z.string(),
});
export const GerichtDTO = CodeWertSchema.describe("Gericht DTO");
export const RollenDTO = CodeWertSchema.describe("Rollen DTO");

export const VerfahrenSchema = z.object({
  id: z.uuid(),
  aktenzeichen_gericht: z.nullable(z.string()),
  status: z.enum(["Erstellt", "Eingereicht"]),
  status_changed: z.iso.datetime(),
  eingereicht_am: z.nullable(z.iso.datetime()),
  gericht: z.nullable(GerichtDTO),
  beteiligungen: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      rollen: z.array(RollenDTO),
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
