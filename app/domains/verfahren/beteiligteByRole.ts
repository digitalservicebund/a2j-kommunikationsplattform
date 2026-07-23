type Rolle = {
  code?: string | null;
};

type Beteiligte = {
  id?: string;
  name?: string | null;
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
      beteiligung.rollen?.some((rolle) => rolle.code === roleCode),
    ) ?? []
  );
}

export function getBeteiligungByRoleCode<T extends Beteiligte>(
  beteiligte: T[] | null | undefined,
  roleCode: string,
): T | undefined {
  return getBeteiligteByRoleCode(beteiligte, roleCode)[0];
}

export function getBeteiligteNamesByRoleCode<T extends Beteiligte>(
  beteiligte: T[] | null | undefined,
  roleCode: string,
  notAvailableLabel: string,
): string {
  const names = getBeteiligteByRoleCode(beteiligte, roleCode)
    .map((beteiligung) => beteiligung.name)
    .filter((name): name is string => Boolean(name));

  if (names.length === 0) {
    return notAvailableLabel;
  }

  return names.join(", ");
}
