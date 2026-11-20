import { describe, expect, it } from "vitest";
import type { BeteiligungRolleFieldValues } from "../BeteiligungFieldset";
import { partitionBeteiligungItemsBySeite } from "../partitionBeteiligungItemsBySeite";
import type { BeteiligungFieldsetItem } from "../VerfahrenCreationBeteiligungSeiteFieldset";

const KLAEGERIN = "id-klaegerin";
const BEKLAGTE = "id-beklagte";
const PROZESSBEVOLLMAECHTIGTE = "id-prozessbevollmaechtigte";
const STREITVERKUENDETE = "id-streitverkuendete";

const rollenbezeichnungIds = {
  klagendePartei: KLAEGERIN,
  beklagtePartei: BEKLAGTE,
  prozessbevollmaechtigte: PROZESSBEVOLLMAECHTIGTE,
};

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
      kanzleiformId: null,
      rechtsformId: null,
    },
  };
}

function rollennummerMap(items: BeteiligungFieldsetItem[]) {
  return new Map(
    items.flatMap((item) =>
      item.defaultValues.rollen.map(
        (rolle) => [rolle.rollennummer!, rolle.rollenbezeichnungId] as const,
      ),
    ),
  );
}

function partition(items: BeteiligungFieldsetItem[]) {
  return partitionBeteiligungItemsBySeite(
    items,
    rollenbezeichnungIds,
    rollennummerMap(items),
  );
}

describe(partitionBeteiligungItemsBySeite, () => {
  it("assigns Parteien and their Prozessbevollmächtigte to their Seite", () => {
    const klaegerin = makeItem(0, {
      rollennummer: "r0",
      rollenbezeichnungId: KLAEGERIN,
    });
    const klaegerinVertretung = makeItem(1, {
      rollennummer: "r1",
      rollenbezeichnungId: PROZESSBEVOLLMAECHTIGTE,
      referenz: ["r0"],
    });
    const beklagte = makeItem(2, {
      rollennummer: "r2",
      rollenbezeichnungId: BEKLAGTE,
    });
    const beklagteVertretung = makeItem(3, {
      rollennummer: "r3",
      rollenbezeichnungId: PROZESSBEVOLLMAECHTIGTE,
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
      rollenbezeichnungId: KLAEGERIN,
    });
    const beklagte = makeItem(1, {
      rollennummer: "r1",
      rollenbezeichnungId: BEKLAGTE,
    });
    const vertretung = makeItem(2, {
      rollennummer: "r2",
      rollenbezeichnungId: PROZESSBEVOLLMAECHTIGTE,
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
      rollenbezeichnungId: KLAEGERIN,
    });
    const streitverkuendete = makeItem(1, {
      rollennummer: "r1",
      rollenbezeichnungId: STREITVERKUENDETE,
    });
    const vertretungOfUnknownPartei = makeItem(2, {
      rollennummer: "r2",
      rollenbezeichnungId: PROZESSBEVOLLMAECHTIGTE,
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
