import { describe, expect, it } from "vitest";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import generateRollennummer from "../generateRollennummer";

describe("generateRollennummer", () => {
  it.each([
    [0, ROLLENBEZEICHNUNG_CODE_KLAEGERIN, "000:101"],
    [1, ROLLENBEZEICHNUNG_CODE_BEKLAGTE, "001:028"],
    [2, ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE, "002:132"],
  ])(
    "combines Beteiligung number %i and Rollenbezeichnung code %s into %s",
    (beteiligungNumber, rollenbezeichnungCode, expected) => {
      expect(
        generateRollennummer(beteiligungNumber, rollenbezeichnungCode),
      ).toBe(expected);
    },
  );

  it.each([
    [7, "007:101"],
    [42, "042:101"],
    [999, "999:101"],
  ])(
    "pads Beteiligung number %i to three digits",
    (beteiligungNumber, expected) => {
      expect(
        generateRollennummer(
          beteiligungNumber,
          ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        ),
      ).toBe(expected);
    },
  );

  it("does not truncate Beteiligung numbers with more than three digits", () => {
    expect(generateRollennummer(1000, ROLLENBEZEICHNUNG_CODE_KLAEGERIN)).toBe(
      "1000:101",
    );
  });
});
