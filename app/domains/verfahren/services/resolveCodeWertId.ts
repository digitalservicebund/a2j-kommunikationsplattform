import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";

export default function resolveCodeWertId(
  elemente: z.infer<typeof CodeWertSchema>[],
  code: string,
): string {
  const match = elemente.find((element) => element.code === code);

  if (!match) {
    throw new Error(`No code list entry found for code "${code}".`);
  }

  return match.id;
}
