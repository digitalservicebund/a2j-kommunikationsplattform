// Paths of the Klageeinreichung flow: the SAFE-ID and court selection followed
// by the three steps, which identify their draft by the `?verfahren=` search
// param
export const KLAGEEINREICHUNG_PATHS = {
  neu: "/verfahren/neu",
  dokumente: "/verfahren/neu/dokumente",
  details: "/verfahren/neu/details",
  beteiligte: "/verfahren/neu/beteiligte",
} as const;

type KlageeinreichungStep = Exclude<keyof typeof KLAGEEINREICHUNG_PATHS, "neu">;

export function buildKlageeinreichungPath(
  step: KlageeinreichungStep,
  params: { verfahren: string } | { gericht: string; safeId: string },
): string {
  return `${KLAGEEINREICHUNG_PATHS[step]}?${new URLSearchParams(params)}`;
}
