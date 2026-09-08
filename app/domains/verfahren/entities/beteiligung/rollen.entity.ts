import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";

export const RollenSchema = z.object({
  id: z.string(),
  rollennummer: z.nullable(z.string()),
  rollenbezeichnung: CodeWertSchema,
  geschaeftszeichen: z.nullable(z.string()),
  referenz: z.nullable(z.string()),
});

export type Rollen = z.infer<typeof RollenSchema>;
