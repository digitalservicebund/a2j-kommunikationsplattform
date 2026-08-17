import { describe, expect, it } from "vitest";
import {
  formatAnschrift,
  getBeteiligteAnschrift,
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "../beteiligteContactInfo";

const beteiligung = {
  anschriften: [
    {
      strasse: "Bockenheimer Landstraße",
      hausnummer: "42-44",
      postleitzahl: "60323",
      ort: "Frankfurt am Main",
    },
  ],
  telekommunikation: [
    {
      telekommunikationsart: { code: "001" },
      verbindung: "emiliakuehn@posteo.de",
    },
    { telekommunikationsart: { code: "004" }, verbindung: "06921994731" },
  ],
};

describe("getBeteiligteAnschrift", () => {
  it("returns the first anschrift", () => {
    expect(getBeteiligteAnschrift(beteiligung)).toEqual(
      beteiligung.anschriften[0],
    );
  });

  it("returns undefined when there are no anschriften", () => {
    expect(getBeteiligteAnschrift({ anschriften: null })).toBeUndefined();
    expect(getBeteiligteAnschrift(undefined)).toBeUndefined();
  });
});

describe("getBeteiligteEmail", () => {
  it("returns the verbindung of the email entry", () => {
    expect(getBeteiligteEmail(beteiligung)).toBe("emiliakuehn@posteo.de");
  });

  it("returns an empty string when there is no email entry", () => {
    expect(getBeteiligteEmail({ telekommunikation: null })).toBe("");
  });
});

describe("getBeteiligteTelefon", () => {
  it("returns the verbindung of the mobile phone entry", () => {
    expect(getBeteiligteTelefon(beteiligung)).toBe("06921994731");
  });

  it("returns an empty string when there is no phone entry", () => {
    expect(getBeteiligteTelefon({ telekommunikation: null })).toBe("");
  });
});

describe("formatAnschrift", () => {
  it("combines street/house number and postcode/city into one string", () => {
    expect(
      formatAnschrift({
        strasse: "Bockenheimer Landstraße",
        hausnummer: "42-44",
        postleitzahl: "60323",
        ort: "Frankfurt am Main",
      }),
    ).toBe("Bockenheimer Landstraße 42-44, 60323 Frankfurt am Main");
  });

  it("returns null when there is no anschrift", () => {
    expect(formatAnschrift(undefined)).toBeNull();
    expect(formatAnschrift(null)).toBeNull();
  });

  it("returns null when all fields are empty", () => {
    expect(
      formatAnschrift({
        strasse: null,
        hausnummer: null,
        postleitzahl: null,
        ort: null,
      }),
    ).toBeNull();
  });
});
