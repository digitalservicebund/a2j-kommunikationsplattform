import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "../entities/codelisten/rollenbezeichnung.entity";

type Rolle = {
  rollenbezeichnung?: { code?: string | null } | null;
  geschaeftszeichen?: string | null;
  referenz: string[];
};

type Beteiligte = {
  id?: string;
  beteiligtenart?: string;
  nachname?: string | null;
  vorname?: string | null;
  bezeichnung?: string | null;
  rollen?: Rolle[] | null;
};

// TODO: Remove these duplicate constants
export const ROLE_CODE_KLAEGERIN = ROLLENBEZEICHNUNG_CODE_KLAEGERIN;
export const ROLE_CODE_BEKLAGTE = ROLLENBEZEICHNUNG_CODE_BEKLAGTE;
export const ROLE_CODE_PROZESSBEVOLLMAECHTIGTE =
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE;

export function getBeteiligteByRoleCode<T extends Beteiligte>(
  beteiligte: T[] | null | undefined,
  roleCode: string,
): T[] {
  return (
    beteiligte?.filter((beteiligung) =>
      beteiligung.rollen?.some(
        (rolle) => rolle.rollenbezeichnung?.code === roleCode,
      ),
    ) ?? []
  );
}

export function getBeteiligungByRoleCode<T extends Beteiligte>(
  beteiligte: T[] | null | undefined,
  roleCode: string,
): T | undefined {
  return getBeteiligteByRoleCode(beteiligte, roleCode)[0];
}

export function getBeteiligteDisplayName(
  beteiligung: Beteiligte | null | undefined,
): string | null | undefined {
  if (beteiligung?.nachname) {
    return [beteiligung.vorname, beteiligung.nachname]
      .filter(Boolean)
      .join(" ");
  }

  return beteiligung?.bezeichnung;
}

export function getGeschaeftszeichenByRoleCode(
  beteiligung: Beteiligte | null | undefined,
  roleCode: string,
): string | null | undefined {
  return beteiligung?.rollen?.find(
    (rolle) => rolle.rollenbezeichnung?.code === roleCode,
  )?.geschaeftszeichen;
}

export function getBeteiligteNamesByRoleCode(
  beteiligte: Beteiligte[] | null | undefined,
  roleCode: string,
  notAvailableLabel: string,
): string {
  const names = getBeteiligteByRoleCode(beteiligte, roleCode)
    .map((beteiligung) => getBeteiligteDisplayName(beteiligung))
    .filter((name): name is string => Boolean(name));

  if (names.length === 0) {
    return notAvailableLabel;
  }

  return names.join(", ");
}

export function getProzessbevollmaechtigteByReferenz<T extends Beteiligte>(
  beteiligte: T[],
  referenz: string,
): T[] {
  return beteiligte?.filter((beteiligung) =>
    beteiligung.rollen?.some(
      (rolle) =>
        rolle.rollenbezeichnung?.code ===
          ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE &&
        rolle.referenz.includes(referenz),
    ),
  );
}
