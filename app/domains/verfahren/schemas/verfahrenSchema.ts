import z from "zod";

/**
 * VerfahrenSchema
 *
 * See Verfahren Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const CodeWertSchema = z.object({
  id: z.string(),
  wert: z.nullable(z.string()),
  code: z.nullable(z.string()),
});

export const GerichtDTO = CodeWertSchema;
export const RollenDTO = CodeWertSchema;

export const VerfahrenSchema = z.object({
  id: z.string(),
  aktenzeichen_gericht: z.nullable(z.string()),
  status: z.enum(["ERSTELLT", "EINGEREICHT"]),
  status_changed: z.iso.datetime(),
  eingereicht_am: z.nullable(z.iso.datetime()),
  gericht: GerichtDTO,
  beteiligungen: z.nullable(
    z.array(
      z.object({
        id: z.string(),
        name: z.nullable(z.string()),
        rollen: z.nullable(z.array(RollenDTO)),
        prozessbevollmaechtigte: z.nullable(
          z.array(
            z.object({
              id: z.string(),
              name: z.nullable(z.string()),
              aktenzeichen: z.nullable(z.string()),
            }),
          ),
        ),
      }),
    ),
  ),
});
