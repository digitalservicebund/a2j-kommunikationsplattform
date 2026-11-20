import type { BeteiligungFieldsetItem } from "./VerfahrenCreationBeteiligungSeiteFieldset";

export type RollenbezeichnungIdsBySeite = {
  klagendePartei: string;
  beklagtePartei: string;
  prozessbevollmaechtigte: string;
};

export type BeteiligungItemsBySeite = {
  klagendenseite: BeteiligungFieldsetItem[];
  beklagtenseite: BeteiligungFieldsetItem[];
};

function hasRolle(
  item: BeteiligungFieldsetItem,
  rollenbezeichnungId: string,
): boolean {
  return item.defaultValues.rollen.some(
    (rolle) => rolle.rollenbezeichnungId === rollenbezeichnungId,
  );
}

function representsParteiWithRolle(
  item: BeteiligungFieldsetItem,
  parteiRollenbezeichnungId: string,
  rollenbezeichnungIds: RollenbezeichnungIdsBySeite,
  rollennummerToRollenbezeichnungId: Map<string, string>,
): boolean {
  const vertretungRolle = item.defaultValues.rollen.find(
    (rolle) =>
      rolle.rollenbezeichnungId ===
      rollenbezeichnungIds.prozessbevollmaechtigte,
  );
  return (
    vertretungRolle?.referenz.some(
      (rollennummer) =>
        rollennummerToRollenbezeichnungId.get(rollennummer) ===
        parteiRollenbezeichnungId,
    ) ?? false
  );
}

function belongsToSeite(
  item: BeteiligungFieldsetItem,
  parteiRollenbezeichnungId: string,
  rollenbezeichnungIds: RollenbezeichnungIdsBySeite,
  rollennummerToRollenbezeichnungId: Map<string, string>,
): boolean {
  return (
    hasRolle(item, parteiRollenbezeichnungId) ||
    representsParteiWithRolle(
      item,
      parteiRollenbezeichnungId,
      rollenbezeichnungIds,
      rollennummerToRollenbezeichnungId,
    )
  );
}

/**
 * Assigns each Beteiligung item to the Klagendenseite or the Beklagtenseite.
 *
 * An item belongs to a Seite if it is a Partei of that Seite or represents one
 * of its Parteien. Every item is assigned to at most one Seite so that its form
 * fields are rendered only once; an item matching both Seiten is assigned to
 * the Klagendenseite.
 *
 * Items matching neither Seite (e.g., witnesses) are omitted. The
 * `/verfahren/neu/beteiligte` action keeps the corresponding Beteiligungen
 * unchanged.
 */
export function partitionBeteiligungItemsBySeite(
  items: BeteiligungFieldsetItem[],
  rollenbezeichnungIds: RollenbezeichnungIdsBySeite,
  rollennummerToRollenbezeichnungId: Map<string, string>,
): BeteiligungItemsBySeite {
  const result: BeteiligungItemsBySeite = {
    klagendenseite: [],
    beklagtenseite: [],
  };

  for (const item of items) {
    if (
      belongsToSeite(
        item,
        rollenbezeichnungIds.klagendePartei,
        rollenbezeichnungIds,
        rollennummerToRollenbezeichnungId,
      )
    ) {
      result.klagendenseite.push(item);
    } else if (
      belongsToSeite(
        item,
        rollenbezeichnungIds.beklagtePartei,
        rollenbezeichnungIds,
        rollennummerToRollenbezeichnungId,
      )
    ) {
      result.beklagtenseite.push(item);
    }
  }

  return result;
}
