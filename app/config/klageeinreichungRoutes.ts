// Paths of the Klageeinreichung flow: the court selection followed by the
// three steps, which identify their draft by the `?verfahren=` search param
export const KLAGEEINREICHUNG_PATHS = {
  gerichtAuswahl: "/verfahren/neu/gericht-auswahl",
  dokumente: "/verfahren/neu/dokumente",
  verfahrendetails: "/verfahren/neu/verfahrendetails",
  beteiligte: "/verfahren/neu/beteiligte",
} as const;

type KlageeinreichungStep = Exclude<
  keyof typeof KLAGEEINREICHUNG_PATHS,
  "gerichtAuswahl"
>;

export function buildKlageeinreichungPath(
  step: KlageeinreichungStep,
  params: { verfahren: string } | { gericht: string },
): string {
  return `${KLAGEEINREICHUNG_PATHS[step]}?${new URLSearchParams(params)}`;
}
