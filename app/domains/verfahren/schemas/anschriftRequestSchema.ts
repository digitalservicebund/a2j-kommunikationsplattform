import z from "zod";

export const AnschriftRequestSchema = z.object({
  anschriftstyp_id: z.nullable(z.string()),
  strasse: z.nullable(z.string()),
  hausnummer: z.nullable(z.string()),
  postleitzahl: z.nullable(z.string()),
  ort: z.nullable(z.string()),
  postfachnummer: z.nullable(z.string()),
  staat_id: z.nullable(z.string()),
});
