import z from "zod";

/**
 * Currently available on the API: https://kompla.sinc.de/swagger/index.html#/Verfahren/Verfahren_Get
 *
 * "id": "string",
 * "aktenzeichen": "string",
 * "status": "Erstellt",
 * "status_changed": "2025-09-24T12:53:36.775Z",
 * "eingereicht_am": "2025-09-24T12:53:36.775Z",
 * "gericht_name": "string"
 *
 * All other items are mocked for development (therefor optional for now)
 */
export default z.object({
  id: z.uuid(),
  aktenzeichen: z.nullable(z.string()),
  status: z.enum(["Erstellt", "Eingereicht"]),
  status_changed: z.iso.datetime(),
  eingereicht_am: z.iso.datetime(),
  gericht_name: z.nullable(z.string()),
  // START (not available via API)
  update: z.optional(z.nullable(z.string())),
  abgeschlossen: z.optional(z.boolean()),
  urteilsHref: z.optional(z.nullable(z.string())),
  mandantin: z.optional(z.nullable(z.string())),
  gegenpartei: z.optional(z.nullable(z.string())),
  vertretung: z.optional(z.nullable(z.string())),
  geschaeftszeichen: z.optional(z.nullable(z.string())),
  // END
});
