type Rolle = {
  rollenbezeichnung?: { code?: string | null } | null;
  geschaeftszeichen?: string | null;
};

type Beteiligte = {
  id?: string;
  nachname?: string | null;
  vorname?: string | null;
  bezeichnung?: string | null;
  rollen?: Rolle[] | null;
};

export const ROLE_CODE_KLAEGERIN = "101";
export const ROLE_CODE_BEKLAGTE = "028";

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

export function getGeschaeftszeichenByRoleCode<T extends Beteiligte>(
  beteiligung: T | null | undefined,
  roleCode: string,
): string | null | undefined {
  return beteiligung?.rollen?.find(
    (rolle) => rolle.rollenbezeichnung?.code === roleCode,
  )?.geschaeftszeichen;
}

export function getBeteiligteNamesByRoleCode<T extends Beteiligte>(
  beteiligte: T[] | null | undefined,
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
