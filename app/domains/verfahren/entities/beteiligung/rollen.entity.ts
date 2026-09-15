import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";

export const RolleSchema = z.object({
  id: z.string(),
  rollennummer: z.nullable(z.string()),
  rollenbezeichnung: CodeWertSchema,
  geschaeftszeichen: z.nullable(z.string()),
  referenz: z.nullable(z.string()),
});

export type Rolle = z.infer<typeof RolleSchema>;
