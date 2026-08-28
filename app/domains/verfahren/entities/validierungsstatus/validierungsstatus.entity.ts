import z from "zod";

export const ValidierungslaufStatusSchema = z.enum([
  "AUSSTEHEND",
  "LAEUFT",
  "ABGESCHLOSSEN",
]);

const ValidierungsstatusErgebnisSchema = z.enum([
  "NICHT_VERFUEGBAR",
  "GRUEN",
  "GELB",
  "ROT",
]);

/**
 * Validierungsstatus — domain shape (camelCase). Mirrors the wire contract
 * defined in infrastructure/schemas/validierungsstatus.schema.ts, which is
 * responsible for mapping the API's snake_case response into this shape.
 */
export const ValidierungsstatusSchema = z.object({
  validierungslaufStatus: ValidierungslaufStatusSchema,
  ergebnis: ValidierungsstatusErgebnisSchema,
  fehler: z.array(z.string()),
});

export type Validierungsstatus = z.infer<typeof ValidierungsstatusSchema>;
