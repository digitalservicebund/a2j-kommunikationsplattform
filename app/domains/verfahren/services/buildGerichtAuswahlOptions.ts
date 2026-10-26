import type { CodeWert } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import type { ZovGericht } from "~/domains/verfahren/entities/gericht/zovGerichte";

export type GerichtAuswahlOption = {
  value: string;
  label: string;
  komplaGerichtId?: string;
  isZov: boolean;
};

const MISSING_GERICHT_NAME = "Wert fehlt";

/**
 * Merges the KomPla Gerichte code list with the ZOV courts (matched by
 * `code`) into a single list of selectable courts, sorted by name.
 */
export default function buildGerichtAuswahlOptions(
  komplaGerichte: readonly CodeWert[],
  zovGerichte: readonly ZovGericht[],
): GerichtAuswahlOption[] {
  const zovCodes = new Set(zovGerichte.map(({ code }) => code));
  const komplaCodes = new Set(komplaGerichte.map(({ code }) => code));

  const komplaOptions = komplaGerichte.map((gericht): GerichtAuswahlOption => ({
    value: gericht.id,
    label: gericht.wert ?? MISSING_GERICHT_NAME,
    komplaGerichtId: gericht.id,
    isZov: gericht.code !== null && zovCodes.has(gericht.code),
  }));

  const zovOnlyOptions = zovGerichte
    .filter(({ code }) => !komplaCodes.has(code))
    .map((gericht): GerichtAuswahlOption => ({
      value: `zov:${gericht.code}`,
      label: gericht.name,
      isZov: true,
    }));

  return [...komplaOptions, ...zovOnlyOptions].sort((a, b) =>
    a.label.localeCompare(b.label, "de"),
  );
}
