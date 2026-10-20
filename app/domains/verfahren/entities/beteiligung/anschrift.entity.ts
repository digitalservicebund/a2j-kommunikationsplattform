import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";

export const AnschriftSchema = z.object({
  id: z.string(),
  anschriftstyp: z.nullable(CodeWertSchema),
  strasse: z.nullable(z.string()),
  hausnummer: z.nullable(z.string()),
  postleitzahl: z.nullable(z.string()),
  ort: z.nullable(z.string()),
  postfachnummer: z.nullable(z.string()),
  staat: z.nullable(CodeWertSchema),
});

export type Anschrift = z.infer<typeof AnschriftSchema>;
