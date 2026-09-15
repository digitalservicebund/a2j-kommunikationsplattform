import { makeNatuerlichePersonBeteiligung } from "tests/utils/factories/beteiligung";
import {
  makeBeklagteRolle,
  makeKlaegerinRolle,
} from "tests/utils/factories/rolle";
import { describe, expect, it } from "vitest";
import { Beteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { getVerfahrenDisplayName } from "../verfahrenDisplayName";

describe("getVerfahrenDisplayName", () => {
  const klaegerin: Beteiligung = makeNatuerlichePersonBeteiligung({
    rollen: [makeKlaegerinRolle()],
    vorname: "Johanna",
    nachname: "Groß",
  });

  const beklagte: Beteiligung = makeNatuerlichePersonBeteiligung({
    rollen: [makeBeklagteRolle()],
    vorname: "Sebastian",
    nachname: "Löhr",
  });

  it("returns the Kurzrubrum of the Verfahren if set", () => {
    const result = getVerfahrenDisplayName({
      kurzrubrum: "Rubrum",
      beteiligungen: [klaegerin, beklagte],
    });

    expect(result).toBe("Rubrum");
  });

  it("returns the Kläger:in and Beklagte:r if no Kurzrubrum is given", () => {
    const result = getVerfahrenDisplayName({
      kurzrubrum: null,
      beteiligungen: [klaegerin, beklagte],
    });

    expect(result).toBe("Johanna Groß ./. Sebastian Löhr");
  });
});
