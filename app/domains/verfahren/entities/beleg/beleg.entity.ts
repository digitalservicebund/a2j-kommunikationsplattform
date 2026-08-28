import z from "zod";

export const BelegTypSchema = z.enum(["PROTOKOLL", "NACHWEIS"]);

export type BelegTyp = z.infer<typeof BelegTypSchema>;

export const BelegStatusSchema = z.enum(["IN_BEARBEITUNG", "ERSTELLT"]);

export type BelegStatus = z.infer<typeof BelegStatusSchema>;

export const ContentDispositionTypeSchema = z.enum(["INLINE", "ATTACHMENT"]);

export type ContentDispositionType = z.infer<
  typeof ContentDispositionTypeSchema
>;

/**
 * Beleg — domain shape (camelCase). Mirrors the wire contract defined in
 * infrastructure/schemas/beleg.schema.ts, which is responsible for mapping
 * the API's snake_case response into this shape.
 */
export const BelegSchema = z.object({
  id: z.string(),
  erstelltAm: z.string(),
  // The OpenAPI contract documents `typ` as optional-but-not-nullable, but
  // the API returns `typ: null` while a Beleg is still IN_BEARBEITUNG (its
  // Typ isn't determined until processing completes).
  // TODO:remove the nullable part after confirming it with SINC
  typ: z.nullish(BelegTypSchema),
  status: BelegStatusSchema,
  einreichungId: z.string().optional(),
  anzeigename: z.nullable(z.string()).optional(),
  dateiname: z.nullable(z.string()),
  contentType: z.nullable(z.string()),
  sizeInBytes: z.nullable(z.number()).optional(),
});

export type Beleg = z.infer<typeof BelegSchema>;
