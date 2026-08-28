import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";

export const TelekommunikationSchema = z.object({
  id: z.string(),
  telekommunikationsart: CodeWertSchema.extend({
    beschreibung: z.nullable(z.string()),
  }),
  verbindung: z.string(),
});

export type Telekommunikation = z.infer<typeof TelekommunikationSchema>;
