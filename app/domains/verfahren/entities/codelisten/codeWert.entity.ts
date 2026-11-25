import z from "zod";

/**
 * Schema for {@link CodeWert}.
 */
export const CodeWertSchema = z.object({
  id: z.string(),
  wert: z.string(),
  code: z.string(),
});

/**
 * An entry in a code list (Codeliste).
 *
 * `code` is the code standardized by XJustiz or one of the adjacent XÖV
 * standards; `id` is the ID of the entry within the KomPla API. `wert`
 * contains a human-readable name for the code.
 *
 * NOTE: As code lists are versioned and the KomPla backend keeps previous
 * code list versions in its database, there might be multiple `CodeWert`
 * entities with the same `code` but different IDs. However, when asking
 * the KomPla API for a code list, only entries from the latest supported
 * code list version are returned, without `code` duplicates.
 */
export type CodeWert = z.infer<typeof CodeWertSchema>;
