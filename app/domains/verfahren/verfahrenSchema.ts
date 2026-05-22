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

export const GerichtDTO = CodeWertSchema.describe("Gericht DTO");

export const RollenDTO = CodeWertSchema.describe("Rollen DTO");

export const VerfahrenSchema = z.object({
  id: z.string(),
  aktenzeichen_gericht: z.nullable(z.string()),
  status: z.optional(z.enum(["ERSTELLT", "EINGEREICHT"])),
  status_changed: z.iso.datetime(),
  eingereicht_am: z.nullable(z.iso.datetime()),
  gericht: z.nullable(GerichtDTO),
  beteiligungen: z.nullable(
    z.array(
      z.object({
        id: z.string(),
        name: z.nullable(z.string()),
        rollen: z.nullable(z.array(RollenDTO)),
        prozessbevollmaechtigte: z.nullable(
          z.array(
            z.object({
              aktenzeichen: z.string(),
              id: z.string(),
              name: z.string(),
            }),
          ),
        ),
      }),
    ),
  ),
});
