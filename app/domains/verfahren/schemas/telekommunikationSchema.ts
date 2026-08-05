import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";

export const TelekommunikationSchema = z.object({
  id: z.string(),
  telekommunikationsart: CodeWertSchema.extend({
    beschreibung: z.nullable(z.string()),
  }),
  verbindung: z.string(),
});
