import { describe, expect, it } from "vitest";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import type { BeteiligungRolleFieldValues } from "../BeteiligungFieldset";
import { partitionBeteiligungItemsBySeite } from "../partitionBeteiligungItemsBySeite";
import type { BeteiligungFieldsetItem } from "../VerfahrenCreationBeteiligungSeiteFieldset";

// Example Rollenbezeichnung that does not belong to either Seite
const ROLLENBEZEICHNUNG_CODE_STREITVERKUENDETE = "376";

function makeItem(
  key: number,
  rolle: Omit<BeteiligungRolleFieldValues, "referenz"> & {
    referenz?: string[];
  },
): BeteiligungFieldsetItem {
  return {
    key,
    defaultValues: {
      beteiligtenart: "natuerlichePerson",
      rollen: [{ referenz: [], ...rolle }],
      kanzleiformCode: null,
      rechtsformCode: null,
    },
  };
}

function rollennummerMap(items: BeteiligungFieldsetItem[]) {
  return new Map(
    items.flatMap((item) =>
      item.defaultValues.rollen.map(
        (rolle) => [rolle.rollennummer!, rolle.rollenbezeichnungCode] as const,
      ),
    ),
  );
}

function partition(items: BeteiligungFieldsetItem[]) {
  return partitionBeteiligungItemsBySeite(items, rollennummerMap(items));
}

describe(partitionBeteiligungItemsBySeite, () => {
  it("assigns Parteien and their Prozessbevollmächtigte to their Seite", () => {
    const klaegerin = makeItem(0, {
      rollennummer: "r0",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
    });
    const klaegerinVertretung = makeItem(1, {
      rollennummer: "r1",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
      referenz: ["r0"],
    });
    const beklagte = makeItem(2, {
      rollennummer: "r2",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    });
    const beklagteVertretung = makeItem(3, {
      rollennummer: "r3",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
      referenz: ["r2"],
    });

    expect(
      partition([klaegerin, klaegerinVertretung, beklagte, beklagteVertretung]),
    ).toEqual({
      klagendenseite: [klaegerin, klaegerinVertretung],
      beklagtenseite: [beklagte, beklagteVertretung],
    });
  });

  it("assigns a Prozessbevollmächtigter representing both Seiten only to the Klagendenseite", () => {
    const klaegerin = makeItem(0, {
      rollennummer: "r0",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
    });
    const beklagte = makeItem(1, {
      rollennummer: "r1",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
    });
    const vertretung = makeItem(2, {
      rollennummer: "r2",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
      referenz: ["r1", "r0"],
    });

    expect(partition([klaegerin, beklagte, vertretung])).toEqual({
      klagendenseite: [klaegerin, vertretung],
      beklagtenseite: [beklagte],
    });
  });

  it("omits Beteiligungen belonging to neither Seite", () => {
    const klaegerin = makeItem(0, {
      rollennummer: "r0",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
    });
    const streitverkuendete = makeItem(1, {
      rollennummer: "r1",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_STREITVERKUENDETE,
    });
    const vertretungOfUnknownPartei = makeItem(2, {
      rollennummer: "r2",
      rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
      referenz: ["unknown"],
    });

    expect(
      partition([klaegerin, streitverkuendete, vertretungOfUnknownPartei]),
    ).toEqual({
      klagendenseite: [klaegerin],
      beklagtenseite: [],
    });
  });
});
