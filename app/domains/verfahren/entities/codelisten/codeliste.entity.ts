import z from "zod";

export function createCodelisteSchema<T>(elementeSchema: z.ZodType<T>) {
  return z
    .object({
      list_version: z.string(),
      elemente: z.array(elementeSchema),
    })
    .transform((input) => ({
      listeVersion: input.list_version,
      elemente: input.elemente,
    }));
}

/**
 * An enumeration-like list of codes representing options of a certain type
 * (e.g., country codes). The KomPla relies on code lists published for the
 * XÖV family of standards (including XJustiz) in the [XRepository][1].
 *
 * [1]: https://www.xrepository.de/
 */
export type Codeliste<T> = z.infer<ReturnType<typeof createCodelisteSchema<T>>>;
