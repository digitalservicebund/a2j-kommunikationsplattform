import { redirect, type ActionFunctionArgs } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KANZLEIFORM_CODE_EINZELANWALT } from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { makeAuthSession } from "~tests/utils/factories/authSession";
import { makeNatuerlichePersonBeteiligung } from "~tests/utils/factories/beteiligung";
import { makeGericht } from "~tests/utils/factories/gericht";
import { makeKlaegerinRolle, makeRolle } from "~tests/utils/factories/rolle";
import { makeVerfahren } from "~tests/utils/factories/verfahren";

const mocks = vi.hoisted(() => ({
  updateVerfahren: vi.fn(),
  loadKlageeinreichungDraft: vi.fn(),
  regenerateEinreichungXJustiz: vi.fn(),
}));

const { codeListFetcher } = vi.hoisted(() => ({
  codeListFetcher:
    (...elemente: { wert: string; code: string }[]) =>
    async () => ({
      elemente: elemente.map((element) => ({
        id: `id-${element.code}`,
        ...element,
      })),
    }),
}));

vi.mock(
  "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server",
  () => ({
    fetchKanzleiformen: codeListFetcher({ wert: "Einzelanwalt", code: "001" }),
    fetchRechtsformen: codeListFetcher({ wert: "GmbH", code: "001" }),
    fetchStaaten: codeListFetcher({ wert: "Deutschland", code: "000" }),
    fetchAnschriftstypen: codeListFetcher(
      { wert: "Privatanschrift", code: "017" },
      { wert: "Dienst-/Geschäftsanschrift", code: "003" },
    ),
    fetchTelekommunikationsarten: codeListFetcher(
      { wert: "E-Mail", code: "001" },
      { wert: "Mobiltelefon", code: "004" },
    ),
    fetchRollenbezeichnungen: codeListFetcher(
      { wert: "Klägerin", code: "101" },
      { wert: "Beklagte", code: "028" },
      { wert: "Prozessbevollmächtigte", code: "132" },
    ),
  }),
);
vi.mock(
  "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server",
  () => ({
    updateVerfahren: mocks.updateVerfahren,
  }),
);
vi.mock(
  "~/domains/verfahren/application/loadKlageeinreichungDraft.server",
  async (importOriginal) => ({
    ...(await importOriginal()),
    default: mocks.loadKlageeinreichungDraft,
  }),
);
vi.mock(
  "~/domains/verfahren/application/regenerateEinreichungXJustiz.server",
  () => ({ default: mocks.regenerateEinreichungXJustiz }),
);
vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import { action } from "../verfahren.neu.beteiligte";

const VERFAHREN_ID = "11111111-1111-1111-1111-111111111111";

// Code list IDs as returned by the mocked stammdatenRepository
const KLAEGERIN = "id-101";
const BEKLAGTE = "id-028";
const PROZESSBEVOLLMAECHTIGTE = "id-132";
const PRIVATANSCHRIFT = "id-017";
const GESCHAEFTSANSCHRIFT = "id-003";
const DEUTSCHLAND = "id-000";
const EMAIL = "id-001";
const MOBILTELEFON = "id-004";

const authSession = makeAuthSession();

type FieldValue = string | string[];

/**
 * Builds the form fields of the Beteiligung with the given key, using the
 * bracket notation of the form (e.g. `beteiligungen[0][rollen][0][referenz][]`).
 * Array values are appended as repeated fields.
 */
function beteiligungFields(
  key: number,
  fields: Record<string, FieldValue>,
): [string, FieldValue][] {
  return Object.entries(fields).map(([path, value]) => [
    `beteiligungen[${key}]${path}`,
    value,
  ]);
}

function makeFormData(...fieldGroups: [string, FieldValue][][]): FormData {
  const formData = new FormData();
  formData.set("formType", "submit");
  for (const [name, value] of fieldGroups.flat()) {
    for (const item of Array.isArray(value) ? value : [value]) {
      formData.append(name, item);
    }
  }
  return formData;
}

function callAction(formData: FormData) {
  return action({
    request: new Request(`http://localhost:3000/?verfahren=${VERFAHREN_ID}`, {
      method: "POST",
      body: formData,
    }),
    params: {},
    context: { get: () => authSession, set: () => {} },
  } as unknown as ActionFunctionArgs);
}

function updatedBeteiligungen() {
  expect(mocks.updateVerfahren).toHaveBeenCalledOnce();
  return mocks.updateVerfahren.mock.calls[0][2].beteiligungen;
}

function mockDraftVerfahren(verfahren: ReturnType<typeof makeVerfahren>) {
  mocks.loadKlageeinreichungDraft.mockResolvedValue({
    verfahren,
    einreichung: { id: "einreichung-1" },
  });
}

describe("/verfahren/neu/beteiligte action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDraftVerfahren(
      makeVerfahren({
        id: VERFAHREN_ID,
        gericht: makeGericht(),
        beteiligungen: [],
      }),
    );
  });

  it("stores multiple Parteien and Prozessbevollmächtigte on both sides", async () => {
    const formData = makeFormData(
      beteiligungFields(0, {
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollennummer]": `0:${KLAEGERIN}`,
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[vorname]": "Erika",
        "[nachname]": "Mustermann",
        "[strasse]": "Heidestraße",
        "[hausnummer]": "17",
        "[postleitzahl]": "51147",
        "[ort]": "Köln",
        "[email]": "erika.mustermann@example.com",
        "[telefon]": "0170123456",
      }),
      beteiligungFields(1, {
        "[beteiligtenart]": "organisation",
        "[rollen][0][rollennummer]": `1:${KLAEGERIN}`,
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[bezeichnung]": "Mustermann GmbH",
        "[strasse]": "Industriestraße",
        "[hausnummer]": "3",
        "[postleitzahl]": "50667",
        "[ort]": "Köln",
      }),
      beteiligungFields(2, {
        "[beteiligtenart]": "raKanzlei",
        "[rollen][0][rollennummer]": `2:${PROZESSBEVOLLMAECHTIGTE}`,
        "[rollen][0][rollenbezeichnungCode]":
          ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
        "[rollen][0][referenz][]": [`0:${KLAEGERIN}`, `1:${KLAEGERIN}`],
        "[rollen][0][geschaeftszeichen]": "B-17/26",
        "[bezeichnung]": "Kanzlei Böhm",
        "[kanzleiformCode]": KANZLEIFORM_CODE_EINZELANWALT,
        "[rechtsformCode]": "",
        "[strasse]": "Hauptstraße",
        "[hausnummer]": "15",
        "[postleitzahl]": "80123",
        "[ort]": "München",
        "[email]": "kanzlei@boehm.example",
      }),
      beteiligungFields(3, {
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollennummer]": `3:${BEKLAGTE}`,
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
        "[vorname]": "Emine",
        "[nachname]": "Kartal",
        "[strasse]": "Gartenweg",
        "[hausnummer]": "8",
        "[postleitzahl]": "10115",
        "[ort]": "Berlin",
      }),
      beteiligungFields(4, {
        "[beteiligtenart]": "raKanzlei",
        "[rollen][0][rollennummer]": `4:${PROZESSBEVOLLMAECHTIGTE}`,
        "[rollen][0][rollenbezeichnungCode]":
          ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
        "[rollen][0][referenz][]": [`3:${BEKLAGTE}`],
        "[bezeichnung]": "Weber & Partner",
        "[kanzleiformCode]": KANZLEIFORM_CODE_EINZELANWALT,
        "[rechtsformCode]": "001",
        "[strasse]": "Marktplatz",
        "[hausnummer]": "1",
        "[postleitzahl]": "10117",
        "[ort]": "Berlin",
      }),
    );

    await callAction(formData);

    expect(updatedBeteiligungen()).toEqual([
      {
        beteiligtenart: "natuerlichePerson",
        vorname: "Erika",
        titel: null,
        namensvorsatz: null,
        nachname: "Mustermann",
        rollen: [
          {
            rollennummer: `0:${KLAEGERIN}`,
            rollenbezeichnung_id: KLAEGERIN,
            geschaeftszeichen: null,
            referenz: [],
          },
        ],
        anschriften: [
          {
            anschriftstyp_id: PRIVATANSCHRIFT,
            strasse: "Heidestraße",
            hausnummer: "17",
            postleitzahl: "51147",
            ort: "Köln",
            postfachnummer: null,
            staat_id: DEUTSCHLAND,
          },
        ],
        kommunikationsanschluesse: [
          {
            telekommunikationsart_id: EMAIL,
            verbindung: "erika.mustermann@example.com",
          },
          { telekommunikationsart_id: MOBILTELEFON, verbindung: "0170123456" },
        ],
      },
      {
        beteiligtenart: "organisation",
        bezeichnung: "Mustermann GmbH",
        rollen: [
          {
            rollennummer: `1:${KLAEGERIN}`,
            rollenbezeichnung_id: KLAEGERIN,
            geschaeftszeichen: null,
            referenz: [],
          },
        ],
        anschriften: [
          {
            anschriftstyp_id: GESCHAEFTSANSCHRIFT,
            strasse: "Industriestraße",
            hausnummer: "3",
            postleitzahl: "50667",
            ort: "Köln",
            postfachnummer: null,
            staat_id: DEUTSCHLAND,
          },
        ],
        kommunikationsanschluesse: [],
      },
      {
        beteiligtenart: "raKanzlei",
        bezeichnung: "Kanzlei Böhm",
        kanzleiform_id: "id-001",
        rechtsform_id: null,
        rollen: [
          {
            rollennummer: `2:${PROZESSBEVOLLMAECHTIGTE}`,
            rollenbezeichnung_id: PROZESSBEVOLLMAECHTIGTE,
            geschaeftszeichen: "B-17/26",
            referenz: [`0:${KLAEGERIN}`, `1:${KLAEGERIN}`],
          },
        ],
        anschriften: [
          {
            anschriftstyp_id: GESCHAEFTSANSCHRIFT,
            strasse: "Hauptstraße",
            hausnummer: "15",
            postleitzahl: "80123",
            ort: "München",
            postfachnummer: null,
            staat_id: DEUTSCHLAND,
          },
        ],
        kommunikationsanschluesse: [
          {
            telekommunikationsart_id: EMAIL,
            verbindung: "kanzlei@boehm.example",
          },
        ],
      },
      {
        beteiligtenart: "natuerlichePerson",
        vorname: "Emine",
        titel: null,
        namensvorsatz: null,
        nachname: "Kartal",
        rollen: [
          {
            rollennummer: `3:${BEKLAGTE}`,
            rollenbezeichnung_id: BEKLAGTE,
            geschaeftszeichen: null,
            referenz: [],
          },
        ],
        anschriften: [
          {
            anschriftstyp_id: PRIVATANSCHRIFT,
            strasse: "Gartenweg",
            hausnummer: "8",
            postleitzahl: "10115",
            ort: "Berlin",
            postfachnummer: null,
            staat_id: DEUTSCHLAND,
          },
        ],
        kommunikationsanschluesse: [],
      },
      {
        beteiligtenart: "raKanzlei",
        bezeichnung: "Weber & Partner",
        kanzleiform_id: "id-001",
        rechtsform_id: "id-001",
        rollen: [
          {
            rollennummer: `4:${PROZESSBEVOLLMAECHTIGTE}`,
            rollenbezeichnung_id: PROZESSBEVOLLMAECHTIGTE,
            geschaeftszeichen: null,
            referenz: [`3:${BEKLAGTE}`],
          },
        ],
        anschriften: [
          {
            anschriftstyp_id: GESCHAEFTSANSCHRIFT,
            strasse: "Marktplatz",
            hausnummer: "1",
            postleitzahl: "10117",
            ort: "Berlin",
            postfachnummer: null,
            staat_id: DEUTSCHLAND,
          },
        ],
        kommunikationsanschluesse: [],
      },
    ]);
  });

  it("keeps the order of Beteiligungen with non-consecutive keys", async () => {
    // Keys have gaps when Beteiligungen were removed in the form.
    const formData = makeFormData(
      beteiligungFields(0, {
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[nachname]": "Müller",
        "[strasse]": "Heidestraße",
      }),
      beteiligungFields(5, {
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
        "[nachname]": "Weber",
        "[strasse]": "Gartenweg",
      }),
    );

    await callAction(formData);

    expect(updatedBeteiligungen()).toEqual([
      expect.objectContaining({ nachname: "Müller" }),
      expect.objectContaining({ nachname: "Weber" }),
    ]);
  });

  it("updates an existing Beteiligung, keeping data not shown in the form", async () => {
    const existing = makeNatuerlichePersonBeteiligung({
      titel: "Dr.",
      vorname: "Johanna",
      nachname: "Groß",
      rollen: [makeKlaegerinRolle({ rollennummer: "rollennummer-1" })],
      telekommunikation: [
        {
          id: "telekommunikation-1",
          telekommunikationsart: {
            id: EMAIL,
            wert: "E-Mail",
            code: "001",
            beschreibung: null,
          },
          verbindung: "alt@example.com",
        },
        {
          id: "telekommunikation-2",
          telekommunikationsart: {
            id: MOBILTELEFON,
            wert: "Mobiltelefon",
            code: "004",
            beschreibung: null,
          },
          verbindung: "06921994731",
        },
      ],
    });

    mockDraftVerfahren(
      makeVerfahren({
        id: VERFAHREN_ID,
        gericht: makeGericht(),
        beteiligungen: [existing],
      }),
    );

    const formData = makeFormData(
      beteiligungFields(0, {
        "[id]": existing.id,
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollennummer]": "rollennummer-1",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[vorname]": "Johanna",
        "[nachname]": "Groß-Weber",
        "[strasse]": "Bockenheimer Landstraße",
        "[hausnummer]": "42-44",
        "[postleitzahl]": "60323",
        "[ort]": "Frankfurt am Main",
        "[email]": "neu@example.com",
        "[telefon]": "",
      }),
    );

    await callAction(formData);

    expect(updatedBeteiligungen()).toEqual([
      expect.objectContaining({
        beteiligtenart: "natuerlichePerson",
        titel: "Dr.",
        vorname: "Johanna",
        nachname: "Groß-Weber",
        rollen: [
          expect.objectContaining({
            rollennummer: "rollennummer-1",
            rollenbezeichnung_id: KLAEGERIN,
          }),
        ],
        kommunikationsanschluesse: [
          { telekommunikationsart_id: EMAIL, verbindung: "neu@example.com" },
        ],
      }),
    ]);
  });

  describe("updating the Anschrift of an existing Beteiligung", () => {
    const zustellanschrift = {
      id: "anschrift-zustell",
      anschriftstyp: {
        id: "id-zustellanschrift",
        wert: "Zustellanschrift",
        code: "zustell",
      },
      strasse: "Postweg",
      hausnummer: "1",
      postleitzahl: "10115",
      ort: "Berlin",
      postfachnummer: null,
      staat: { id: DEUTSCHLAND, wert: "Deutschland", code: "000" },
    };

    const zustellanschriftInput = {
      anschriftstyp_id: "id-zustellanschrift",
      strasse: "Postweg",
      hausnummer: "1",
      postleitzahl: "10115",
      ort: "Berlin",
      postfachnummer: null,
      staat_id: DEUTSCHLAND,
    };

    const submittedPrivatanschriftInput = {
      anschriftstyp_id: PRIVATANSCHRIFT,
      strasse: "Bockenheimer Landstraße",
      hausnummer: "42-44",
      postleitzahl: "60323",
      ort: "Frankfurt am Main",
      postfachnummer: null,
      staat_id: DEUTSCHLAND,
    };

    async function submitAnschrift(
      existingAnschriften: (typeof zustellanschrift)[],
    ) {
      const existing = makeNatuerlichePersonBeteiligung({
        rollen: [makeKlaegerinRolle({ rollennummer: "rollennummer-1" })],
        anschriften: existingAnschriften,
      });
      mockDraftVerfahren(
        makeVerfahren({
          id: VERFAHREN_ID,
          gericht: makeGericht(),
          beteiligungen: [existing],
        }),
      );

      await callAction(
        makeFormData(
          beteiligungFields(0, {
            "[id]": existing.id,
            "[beteiligtenart]": "natuerlichePerson",
            "[rollen][0][rollennummer]": "rollennummer-1",
            "[rollen][0][rollenbezeichnungCode]":
              ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
            "[nachname]": "Groß",
            "[strasse]": "Bockenheimer Landstraße",
            "[hausnummer]": "42-44",
            "[postleitzahl]": "60323",
            "[ort]": "Frankfurt am Main",
          }),
        ),
      );

      return updatedBeteiligungen()[0].anschriften;
    }

    it("overwrites the Anschrift with the matching Anschriftstyp, keeping the others", async () => {
      const privatanschrift = {
        id: "anschrift-privat",
        anschriftstyp: {
          id: PRIVATANSCHRIFT,
          wert: "Privatanschrift",
          code: "017",
        },
        strasse: "Alte Straße",
        hausnummer: "5",
        postleitzahl: "50667",
        ort: "Köln",
        postfachnummer: null,
        staat: { id: DEUTSCHLAND, wert: "Deutschland", code: "000" },
      };

      // The Privatanschrift is deliberately not the first Anschrift.
      const anschriften = await submitAnschrift([
        zustellanschrift,
        privatanschrift,
      ]);

      expect(anschriften).toEqual([
        zustellanschriftInput,
        submittedPrivatanschriftInput,
      ]);
    });

    it("adds the Anschrift if none with the matching Anschriftstyp exists", async () => {
      const anschriften = await submitAnschrift([zustellanschrift]);

      expect(anschriften).toEqual([
        zustellanschriftInput,
        submittedPrivatanschriftInput,
      ]);
    });
  });

  it("keeps existing Beteiligungen not included in the form unchanged", async () => {
    const submitted = makeNatuerlichePersonBeteiligung({
      nachname: "Groß",
      rollen: [makeKlaegerinRolle({ rollennummer: "rollennummer-1" })],
    });
    const notSubmitted = makeNatuerlichePersonBeteiligung({
      vorname: "Hans",
      nachname: "Streit",
      rollen: [
        makeRolle({
          rollennummer: "rollennummer-2",
          rollenbezeichnung: {
            id: "id-streitverkuendete",
            wert: "Streitverkündete(r)",
            code: "999",
          },
        }),
      ],
    });
    mockDraftVerfahren(
      makeVerfahren({
        id: VERFAHREN_ID,
        gericht: makeGericht(),
        beteiligungen: [submitted, notSubmitted],
      }),
    );

    const formData = makeFormData(
      beteiligungFields(0, {
        "[id]": submitted.id,
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollennummer]": "rollennummer-1",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[nachname]": "Groß-Weber",
      }),
    );

    await callAction(formData);

    expect(updatedBeteiligungen()).toEqual([
      expect.objectContaining({ nachname: "Groß-Weber" }),
      expect.objectContaining({
        vorname: "Hans",
        nachname: "Streit",
        rollen: [
          expect.objectContaining({
            rollennummer: "rollennummer-2",
            rollenbezeichnung_id: "id-streitverkuendete",
          }),
        ],
      }),
    ]);
  });

  it("keeps the Verfahrensdetails saved in the previous step", async () => {
    const gericht = makeGericht();
    mockDraftVerfahren(
      makeVerfahren({
        id: VERFAHREN_ID,
        gericht,
        kurzrubrum: "Müller ./. Weber",
        verfahrensgegenstand: "Zahlungsklage",
        beteiligungen: [],
      }),
    );

    const formData = makeFormData(
      beteiligungFields(0, {
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[nachname]": "Müller",
        "[strasse]": "Heidestraße",
      }),
    );

    await callAction(formData);

    expect(mocks.updateVerfahren).toHaveBeenCalledWith(
      authSession,
      VERFAHREN_ID,
      expect.objectContaining({
        verfahrensgegenstand: "Zahlungsklage",
        kurzrubrum: "Müller ./. Weber",
        gericht_id: gericht.id,
      }),
    );
  });

  it("regenerates the XJustiz of the Klageeinreichung and redirects to the Verfahren", async () => {
    const formData = makeFormData(
      beteiligungFields(0, {
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[nachname]": "Müller",
        "[strasse]": "Heidestraße",
      }),
    );

    const response = await callAction(formData);

    expect(mocks.regenerateEinreichungXJustiz).toHaveBeenCalledWith(
      authSession,
      { verfahrenId: VERFAHREN_ID, einreichungId: "einreichung-1" },
    );
    expect(response).toBeInstanceOf(Response);
    expect((response as Response).headers.get("Location")).toBe(
      `/verfahren/${VERFAHREN_ID}`,
    );
  });

  it("rejects invalid input without saving", async () => {
    const formData = makeFormData(
      beteiligungFields(0, {
        "[beteiligtenart]": "unbekannt",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[nachname]": "Müller",
      }),
    );

    const result = await callAction(formData);

    expect(result).toMatchObject({
      init: { status: 400 },
      data: { status: "invalid" },
    });
    expect(mocks.updateVerfahren).not.toHaveBeenCalled();
    expect(mocks.regenerateEinreichungXJustiz).not.toHaveBeenCalled();
  });

  it("redirects without saving if the Klageeinreichung is no longer a draft", async () => {
    mocks.loadKlageeinreichungDraft.mockRejectedValue(
      redirect(`/verfahren/${VERFAHREN_ID}`),
    );

    const formData = makeFormData(
      beteiligungFields(0, {
        "[beteiligtenart]": "natuerlichePerson",
        "[rollen][0][rollenbezeichnungCode]": ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        "[nachname]": "Müller",
      }),
    );

    const response = await callAction(formData).catch(
      (thrown: unknown) => thrown,
    );

    expect(response).toBeInstanceOf(Response);
    expect((response as Response).headers.get("Location")).toBe(
      `/verfahren/${VERFAHREN_ID}`,
    );
    expect(mocks.updateVerfahren).not.toHaveBeenCalled();
    expect(mocks.regenerateEinreichungXJustiz).not.toHaveBeenCalled();
  });
});
