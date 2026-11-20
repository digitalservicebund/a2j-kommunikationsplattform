import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import type { BeteiligungFieldsetItem } from "./VerfahrenCreationBeteiligungSeiteFieldset";

export type BeteiligungItemsBySeite = {
  klagendenseite: BeteiligungFieldsetItem[];
  beklagtenseite: BeteiligungFieldsetItem[];
};

function hasRolle(
  item: BeteiligungFieldsetItem,
  rollenbezeichnungCode: string,
): boolean {
  return item.defaultValues.rollen.some(
    (rolle) => rolle.rollenbezeichnungCode === rollenbezeichnungCode,
  );
}

function representsParteiWithRolle(
  item: BeteiligungFieldsetItem,
  parteiRollenbezeichnungCode: string,
  rollennummerToRollenbezeichnungCode: Map<string, string>,
): boolean {
  const vertretungRolle = item.defaultValues.rollen.find(
    (rolle) =>
      rolle.rollenbezeichnungCode ===
      ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
  );
  return (
    vertretungRolle?.referenz.some(
      (rollennummer) =>
        rollennummerToRollenbezeichnungCode.get(rollennummer) ===
        parteiRollenbezeichnungCode,
    ) ?? false
  );
}

function belongsToSeite(
  item: BeteiligungFieldsetItem,
  parteiRollenbezeichnungCode: string,
  rollennummerToRollenbezeichnungCode: Map<string, string>,
): boolean {
  return (
    hasRolle(item, parteiRollenbezeichnungCode) ||
    representsParteiWithRolle(
      item,
      parteiRollenbezeichnungCode,
      rollennummerToRollenbezeichnungCode,
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
 * Items matching neither Seite (e.g., witnesses) are omitted. On submission,
 * the `/verfahren/neu/beteiligte` action keeps the corresponding Beteiligungen
 * unchanged, unless they are a Partei or Prozessbevollmächtigte(r) (e.g., the
 * Vertretung of an unknown Partei); these are removed.
 */
export function partitionBeteiligungItemsBySeite(
  items: BeteiligungFieldsetItem[],
  rollennummerToRollenbezeichnungCode: Map<string, string>,
): BeteiligungItemsBySeite {
  const result: BeteiligungItemsBySeite = {
    klagendenseite: [],
    beklagtenseite: [],
  };

  for (const item of items) {
    if (
      belongsToSeite(
        item,
        ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        rollennummerToRollenbezeichnungCode,
      )
    ) {
      result.klagendenseite.push(item);
    } else if (
      belongsToSeite(
        item,
        ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
        rollennummerToRollenbezeichnungCode,
      )
    ) {
      result.beklagtenseite.push(item);
    }
  }

  return result;
}
