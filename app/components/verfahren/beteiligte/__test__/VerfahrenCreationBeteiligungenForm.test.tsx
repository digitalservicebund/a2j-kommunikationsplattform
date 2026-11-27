// @vitest-environment jsdom

import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { config } from "~/config/config";
import { Beteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME } from "~/domains/verfahren/services/buildPlaceholderBeteiligungInputs";
import {
  makeNatuerlichePersonBeteiligung,
  makeOrganisationBeteiligung,
  makeRAKanzleiBeteiligung,
} from "~tests/utils/factories/beteiligung";
import { makeEinzelanwaltKanzleiform } from "~tests/utils/factories/kanzleiform";
import {
  makeBeklagteRolle,
  makeKlaegerinRolle,
  makeProzessbevollmeachtigteRolle,
} from "~tests/utils/factories/rolle";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil";
import VerfahrenCreationBeteiligungenForm, {
  existingBeteiligungToFieldValues,
} from "../VerfahrenCreationBeteiligungenForm";

vi.mock("~/config/config", () => ({
  config: vi.fn(),
}));

const t = getTestTranslations().routes.verfahrenNeu.beteiligte.form;

const [privatanschrift] = makeNatuerlichePersonBeteiligung().anschriften!;
const [geschaeftsanschrift] = makeOrganisationBeteiligung().anschriften!;

describe(existingBeteiligungToFieldValues, () => {
  it("maps a natürliche Person, using its Privatanschrift and contact info", () => {
    const beteiligung = makeNatuerlichePersonBeteiligung({
      id: "beteiligung-1",
      vorname: "Erika",
      nachname: "Mustermann",
      rollen: [
        makeKlaegerinRolle({
          rollennummer: "000:101",
          geschaeftszeichen: "AZ-1",
        }),
      ],
      anschriften: [geschaeftsanschrift, privatanschrift],
    });

    expect(existingBeteiligungToFieldValues(beteiligung)).toEqual({
      id: "beteiligung-1",
      beteiligtenart: "natuerlichePerson",
      rollen: [
        {
          rollennummer: "000:101",
          rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          referenz: [],
          geschaeftszeichen: "AZ-1",
        },
      ],
      vorname: "Erika",
      nachname: "Mustermann",
      bezeichnung: "",
      rechtsformCode: null,
      kanzleiformCode: null,
      strasse: privatanschrift.strasse,
      hausnummer: privatanschrift.hausnummer,
      postleitzahl: privatanschrift.postleitzahl,
      ort: privatanschrift.ort,
      email: "johanna.gross@example.com",
      telefon: "06921994731",
    });
  });

  it("maps an Organisation, using its Dienst-/Geschäftsanschrift", () => {
    const beteiligung = makeOrganisationBeteiligung({
      bezeichnung: "Muster GmbH",
      anschriften: [privatanschrift, geschaeftsanschrift],
    });

    expect(existingBeteiligungToFieldValues(beteiligung)).toMatchObject({
      beteiligtenart: "organisation",
      vorname: undefined,
      nachname: "",
      bezeichnung: "Muster GmbH",
      rechtsformCode: null,
      kanzleiformCode: null,
      strasse: geschaeftsanschrift.strasse,
      email: "",
      telefon: "",
    });
  });

  it("maps a RA-Kanzlei including its Kanzleiform and Rechtsform", () => {
    const beteiligung = makeRAKanzleiBeteiligung({
      bezeichnung: "Kanzlei Muster",
      rechtsform: { id: "rechtsform-1", wert: "GmbH", code: "123" },
      rollen: [
        makeProzessbevollmeachtigteRolle({
          rollennummer: "001:132",
          referenz: ["000:101"],
        }),
      ],
    });

    expect(existingBeteiligungToFieldValues(beteiligung)).toMatchObject({
      beteiligtenart: "raKanzlei",
      bezeichnung: "Kanzlei Muster",
      kanzleiformCode: makeEinzelanwaltKanzleiform().code,
      rechtsformCode: "123",
      rollen: [
        {
          rollennummer: "001:132",
          rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
          referenz: ["000:101"],
        },
      ],
    });
  });

  it("maps a missing Rechtsform of a RA-Kanzlei to null", () => {
    const beteiligung = makeRAKanzleiBeteiligung({ rechtsform: null });

    expect(
      existingBeteiligungToFieldValues(beteiligung).rechtsformCode,
    ).toBeNull();
  });

  it("drops placeholder values for Nachname and Bezeichnung", () => {
    expect(
      existingBeteiligungToFieldValues(
        makeNatuerlichePersonBeteiligung({
          nachname: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
        }),
      ).nachname,
    ).toBe("");
    expect(
      existingBeteiligungToFieldValues(
        makeOrganisationBeteiligung({
          bezeichnung: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
        }),
      ).bezeichnung,
    ).toBe("");
    expect(
      existingBeteiligungToFieldValues(
        makeRAKanzleiBeteiligung({
          bezeichnung: PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME,
        }),
      ).bezeichnung,
    ).toBe("");
  });

  it("leaves address fields empty if there is no matching Anschrift", () => {
    const beteiligung = makeNatuerlichePersonBeteiligung({
      anschriften: [geschaeftsanschrift],
    });

    expect(existingBeteiligungToFieldValues(beteiligung)).toMatchObject({
      strasse: "",
      hausnummer: undefined,
      postleitzahl: undefined,
      ort: undefined,
    });
  });
});

describe(VerfahrenCreationBeteiligungenForm, () => {
  beforeEach(() => {
    vi.mocked(config).mockReturnValue({
      ENVIRONMENT: "production",
      LOG_LEVEL: "info",
      SENTRY_DSN: "",
    });
  });

  function renderForm(existingBeteiligungen: Beteiligung[] = []) {
    const { container } = renderWithTestTranslations(
      <form>
        <VerfahrenCreationBeteiligungenForm
          existingBeteiligungen={existingBeteiligungen}
          kanzleiformen={[makeEinzelanwaltKanzleiform()]}
          rechtsformen={[]}
        />
      </form>,
    );
    const form = container.querySelector("form")!;
    return { getFormData: () => new FormData(form) };
  }

  function getSeite(title: string) {
    return screen.getByRole("group", { name: title });
  }

  function getItemTitles(seite: HTMLElement) {
    return within(seite)
      .queryAllByRole("heading", { level: 4 })
      .map((heading) => heading.textContent);
  }

  function klagendenseite() {
    return getSeite(t.klagendenseite.title);
  }

  function beklagtenseite() {
    return getSeite(t.beklagtenseite.title);
  }

  it("renders both Seiten without Beteiligungen if there are none", () => {
    renderForm();

    expect(getItemTitles(klagendenseite())).toEqual([]);
    expect(getItemTitles(beklagtenseite())).toEqual([]);
  });

  it("renders existing Beteiligungen on their respective Seite", () => {
    const { getFormData } = renderForm([
      makeNatuerlichePersonBeteiligung({
        id: "klaegerin",
        rollen: [makeKlaegerinRolle({ rollennummer: "000:101" })],
      }),
      makeOrganisationBeteiligung({
        id: "beklagte",
        rollen: [makeBeklagteRolle({ rollennummer: "001:028" })],
      }),
      makeRAKanzleiBeteiligung({
        id: "vertretung-beklagte",
        rollen: [
          makeProzessbevollmeachtigteRolle({
            rollennummer: "002:132",
            referenz: ["001:028"],
          }),
        ],
      }),
    ]);

    expect(getItemTitles(klagendenseite())).toEqual([
      t.klagendePartei.title.replace("{{number}}", "1"),
    ]);
    expect(getItemTitles(beklagtenseite())).toEqual([
      t.beklagtePartei.title.replace("{{number}}", "1"),
      t.prozessbevollmaechtigte.title.replace("{{number}}", "1"),
    ]);

    const formData = getFormData();
    expect(formData.get("beteiligungen[0][id]")).toBe("klaegerin");
    expect(formData.get("beteiligungen[1][id]")).toBe("beklagte");
    expect(formData.get("beteiligungen[2][id]")).toBe("vertretung-beklagte");
    expect(formData.getAll("beteiligungen[2][rollen][0][referenz][]")).toEqual([
      "001:028",
    ]);
  });

  it("adds a new Partei to the Seite whose button was clicked", async () => {
    const user = userEvent.setup();
    const { getFormData } = renderForm();

    await user.click(
      within(beklagtenseite()).getByRole("button", { name: t.addPartei }),
    );

    expect(getItemTitles(klagendenseite())).toEqual([]);
    expect(getItemTitles(beklagtenseite())).toEqual([
      t.beklagtePartei.title.replace("{{number}}", "1"),
    ]);

    const formData = getFormData();
    expect(formData.has("beteiligungen[0][id]")).toBe(false);
    expect(formData.get("beteiligungen[0][beteiligtenart]")).toBe(
      "natuerlichePerson",
    );
    expect(formData.get("beteiligungen[0][rollen][0][rollennummer]")).toBe(
      "000:028",
    );
    expect(
      formData.get("beteiligungen[0][rollen][0][rollenbezeichnungCode]"),
    ).toBe(ROLLENBEZEICHNUNG_CODE_BEKLAGTE);
  });

  it("assigns new Beteiligungen keys following the existing ones", async () => {
    const user = userEvent.setup();
    const { getFormData } = renderForm([
      makeNatuerlichePersonBeteiligung({
        rollen: [makeKlaegerinRolle({ rollennummer: "000:101" })],
      }),
    ]);

    await user.click(
      within(klagendenseite()).getByRole("button", { name: t.addPartei }),
    );

    expect(getItemTitles(klagendenseite())).toEqual([
      t.klagendePartei.title.replace("{{number}}", "1"),
      t.klagendePartei.title.replace("{{number}}", "2"),
    ]);
    expect(getFormData().get("beteiligungen[1][rollen][0][rollennummer]")).toBe(
      "001:101",
    );
  });

  it("adds a new Prozessbevollmächtigte representing all Parteien of the Seite", async () => {
    const user = userEvent.setup();
    const { getFormData } = renderForm();

    await user.click(
      within(klagendenseite()).getByRole("button", { name: t.addPartei }),
    );
    await user.click(
      within(klagendenseite()).getByRole("button", { name: t.addPartei }),
    );
    await user.click(
      within(beklagtenseite()).getByRole("button", { name: t.addPartei }),
    );
    await user.click(
      within(klagendenseite()).getByRole("button", {
        name: t.addProzessbevollmaechtigte,
      }),
    );

    expect(getItemTitles(klagendenseite())).toEqual([
      t.klagendePartei.title.replace("{{number}}", "1"),
      t.klagendePartei.title.replace("{{number}}", "2"),
      t.prozessbevollmaechtigte.title.replace("{{number}}", "1"),
    ]);

    const formData = getFormData();
    expect(formData.get("beteiligungen[3][beteiligtenart]")).toBe("raKanzlei");
    expect(formData.get("beteiligungen[3][rollen][0][rollennummer]")).toBe(
      "003:132",
    );
    expect(formData.getAll("beteiligungen[3][rollen][0][referenz][]")).toEqual([
      "000:101",
      "001:101",
    ]);
  });

  it("does not render the dummy data button outside of development", () => {
    renderForm();

    expect(
      screen.queryByRole("button", { name: "Fill details with dummy data" }),
    ).not.toBeInTheDocument();
  });

  it("replaces all Beteiligungen with dummy data in development", async () => {
    vi.mocked(config).mockReturnValue({
      ENVIRONMENT: "development",
      LOG_LEVEL: "info",
      SENTRY_DSN: "",
    });
    const user = userEvent.setup();
    const { getFormData } = renderForm([
      makeNatuerlichePersonBeteiligung({
        id: "existing",
        rollen: [makeKlaegerinRolle({ rollennummer: "000:101" })],
      }),
    ]);

    await user.click(
      screen.getByRole("button", { name: "Fill details with dummy data" }),
    );

    expect(getItemTitles(klagendenseite())).toEqual([
      t.klagendePartei.title.replace("{{number}}", "1"),
      t.prozessbevollmaechtigte.title.replace("{{number}}", "1"),
    ]);
    expect(getItemTitles(beklagtenseite())).toEqual([
      t.beklagtePartei.title.replace("{{number}}", "1"),
    ]);

    const formData = getFormData();
    expect(formData.has("beteiligungen[0][id]")).toBe(false);
    expect(formData.get("beteiligungen[0][vorname]")).toBe("Erika");
    expect(formData.get("beteiligungen[1][bezeichnung]")).toBe(
      "Rechtsanwalt Dr. Kathrin Hölzer",
    );
    expect(formData.get("beteiligungen[2][vorname]")).toBe("Emine");
  });
});
