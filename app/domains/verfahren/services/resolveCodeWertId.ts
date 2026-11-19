import { CodeWert } from "~/domains/verfahren/entities/codelisten/codeWert.entity";

export default function resolveCodeWertId(
  elemente: CodeWert[],
  code: string,
): string {
  const match = elemente.find((element) => element.code === code);

  if (!match) {
    throw new Error(`No code list entry found for code "${code}".`);
  }

  return match.id;
}
