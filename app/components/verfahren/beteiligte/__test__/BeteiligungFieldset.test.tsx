// @vitest-environment jsdom

import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { makeEinzelanwaltKanzleiform } from "~tests/utils/factories/kanzleiform";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil";
import BeteiligungFieldset, {
  BeteiligungFieldsetProps,
  BeteiligungFieldValuesSchema,
} from "../BeteiligungFieldset";

const translations = getTestTranslations();
const t = translations.routes.verfahrenNeu.beteiligte.form;
const labels = translations.shared.form.labels;

const vertretungRolle = {
  rollennummer: "002:132",
  rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
};

function renderFieldset(
  defaultValues: z.input<typeof BeteiligungFieldValuesSchema>,
  props: Partial<Omit<BeteiligungFieldsetProps, "defaultValues">> = {},
) {
  const { container } = renderWithTestTranslations(
    <form>
      <BeteiligungFieldset
        title="Beteiligung"
        beteiligungKey={3}
        defaultValues={BeteiligungFieldValuesSchema.parse(defaultValues)}
        kanzleiformen={[]}
        rechtsformen={[]}
        referenceableParteiRollen={[]}
        {...props}
      />
    </form>,
  );
  const form = container.querySelector("form")!;
  return { getFormData: () => new FormData(form) };
}

describe(BeteiligungFieldset, () => {
  it("renders the title as a heading", () => {
    renderFieldset(
      { beteiligtenart: "natuerlichePerson" },
      { title: "Klagende Partei 1" },
    );

    expect(
      screen.getByRole("heading", { level: 4, name: "Klagende Partei 1" }),
    ).toBeInTheDocument();
  });

  it("submits the ID of an existing Beteiligung", () => {
    const { getFormData } = renderFieldset({
      id: "beteiligung-1",
      beteiligtenart: "natuerlichePerson",
    });

    expect(getFormData().get("beteiligungen[3][id]")).toBe("beteiligung-1");
  });

  it("does not submit an ID for a new Beteiligung", () => {
    const { getFormData } = renderFieldset({
      beteiligtenart: "natuerlichePerson",
    });

    expect(getFormData().has("beteiligungen[3][id]")).toBe(false);
  });

  it("renders and submits the fields of a natürliche Person", () => {
    const { getFormData } = renderFieldset({
      beteiligtenart: "natuerlichePerson",
      vorname: "Erika",
      nachname: "Mustermann",
      strasse: "Heidestraße",
      hausnummer: "17",
      postleitzahl: "51147",
      ort: "Köln",
      email: "erika@example.com",
      telefon: "0170123456",
    });

    expect(
      screen.getByRole("radio", {
        name: t.beteiligtenart.options.natuerlichePerson,
      }),
    ).toBeChecked();
    expect(screen.getByRole("textbox", { name: labels.vorname })).toHaveValue(
      "Erika",
    );
    expect(
      screen.queryByRole("textbox", { name: labels.bezeichnung }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("combobox", { name: t.kanzleiform }),
    ).not.toBeInTheDocument();

    expect(Object.fromEntries(getFormData())).toEqual({
      "beteiligungen[3][beteiligtenart]": "natuerlichePerson",
      "beteiligungen[3][vorname]": "Erika",
      "beteiligungen[3][nachname]": "Mustermann",
      "beteiligungen[3][strasse]": "Heidestraße",
      "beteiligungen[3][hausnummer]": "17",
      "beteiligungen[3][postleitzahl]": "51147",
      "beteiligungen[3][ort]": "Köln",
      "beteiligungen[3][email]": "erika@example.com",
      "beteiligungen[3][telefon]": "0170123456",
    });
  });

  it("renders a Bezeichnung instead of a name for an Organisation", () => {
    const { getFormData } = renderFieldset({
      beteiligtenart: "organisation",
      bezeichnung: "Muster GmbH",
    });

    expect(
      screen.getByRole("radio", {
        name: t.beteiligtenart.options.organisation,
      }),
    ).toBeChecked();
    expect(
      screen.queryByRole("textbox", { name: labels.vorname }),
    ).not.toBeInTheDocument();

    const formData = getFormData();
    expect(formData.get("beteiligungen[3][beteiligtenart]")).toBe(
      "organisation",
    );
    expect(formData.get("beteiligungen[3][bezeichnung]")).toBe("Muster GmbH");
    expect(formData.has("beteiligungen[3][nachname]")).toBe(false);
  });

  it("switches between the fields of a natürliche Person and an Organisation", async () => {
    const user = userEvent.setup();
    const { getFormData } = renderFieldset({
      beteiligtenart: "natuerlichePerson",
    });

    await user.click(
      screen.getByRole("radio", {
        name: t.beteiligtenart.options.organisation,
      }),
    );

    expect(
      screen.getByRole("textbox", { name: labels.bezeichnung }),
    ).toBeInTheDocument();
    expect(getFormData().get("beteiligungen[3][beteiligtenart]")).toBe(
      "organisation",
    );

    await user.click(
      screen.getByRole("radio", {
        name: t.beteiligtenart.options.natuerlichePerson,
      }),
    );

    expect(
      screen.getByRole("textbox", { name: labels.vorname }),
    ).toBeInTheDocument();
    expect(getFormData().get("beteiligungen[3][beteiligtenart]")).toBe(
      "natuerlichePerson",
    );
  });

  it("renders the Kanzlei-specific fields for a RA-Kanzlei", () => {
    const sozietaet = {
      id: "kanzleiform-sozietaet",
      wert: "Sozietät",
      code: "002",
    };
    const rechtsformen: Rechtsform[] = [
      { id: "rechtsform-1", wert: "Partnerschaftsgesellschaft", code: "010" },
      { id: "rechtsform-2", wert: "GmbH", code: "020" },
    ];

    const { getFormData } = renderFieldset(
      {
        beteiligtenart: "raKanzlei",
        bezeichnung: "Kanzlei Muster",
        kanzleiformCode: "002",
        rechtsformCode: "020",
        rollen: [
          {
            rollennummer: "000:101",
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          },
          { ...vertretungRolle, geschaeftszeichen: "AZ-42" },
        ],
      },
      {
        kanzleiformen: [sozietaet, makeEinzelanwaltKanzleiform()],
        rechtsformen,
      },
    );

    expect(screen.queryByRole("radio")).not.toBeInTheDocument();

    const kanzleiformSelect = screen.getByRole("combobox", {
      name: t.kanzleiform,
    });
    expect(
      within(kanzleiformSelect)
        .getAllByRole("option")
        .map((option) => option.textContent),
    ).toEqual([
      translations.shared.form.select.placeholder,
      "Einzelanwalt",
      "Sozietät",
    ]);

    const formData = getFormData();
    expect(formData.get("beteiligungen[3][beteiligtenart]")).toBe("raKanzlei");
    expect(formData.get("beteiligungen[3][bezeichnung]")).toBe(
      "Kanzlei Muster",
    );
    expect(formData.get("beteiligungen[3][kanzleiformCode]")).toBe("002");
    expect(formData.get("beteiligungen[3][rechtsformCode]")).toBe("020");
    expect(formData.get("beteiligungen[3][rollen][1][geschaeftszeichen]")).toBe(
      "AZ-42",
    );
  });

  it("submits the Rollen, omitting missing Rollennummern", () => {
    const { getFormData } = renderFieldset({
      beteiligtenart: "natuerlichePerson",
      rollen: [
        {
          rollennummer: "003:101",
          rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
        },
        {
          rollennummer: null,
          rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
        },
      ],
    });

    const formData = getFormData();
    expect(formData.get("beteiligungen[3][rollen][0][rollennummer]")).toBe(
      "003:101",
    );
    expect(
      formData.get("beteiligungen[3][rollen][0][rollenbezeichnungCode]"),
    ).toBe(ROLLENBEZEICHNUNG_CODE_KLAEGERIN);
    expect(formData.has("beteiligungen[3][rollen][1][rollennummer]")).toBe(
      false,
    );
    expect(
      formData.get("beteiligungen[3][rollen][1][rollenbezeichnungCode]"),
    ).toBe(ROLLENBEZEICHNUNG_CODE_BEKLAGTE);
  });

  it("lets a Vertretung select the Parteien it represents", async () => {
    const user = userEvent.setup();
    const { getFormData } = renderFieldset(
      {
        beteiligtenart: "raKanzlei",
        rollen: [{ ...vertretungRolle, referenz: ["000:101"] }],
      },
      {
        referenceableParteiRollen: [
          {
            rollennummer: "000:101",
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          },
          {
            rollennummer: "001:101",
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          },
        ],
      },
    );
    const referenzName = "beteiligungen[3][rollen][0][referenz][]";

    const vertretungReferenzen = screen.getByRole("group", {
      name: t.vertretungReferenzen,
    });
    const partei1 = within(vertretungReferenzen).getByRole("checkbox", {
      name: t.klagendePartei.title.replace("{{number}}", "1"),
    });
    const partei2 = within(vertretungReferenzen).getByRole("checkbox", {
      name: t.klagendePartei.title.replace("{{number}}", "2"),
    });
    expect(partei1).toBeChecked();
    expect(partei2).not.toBeChecked();
    expect(getFormData().getAll(referenzName)).toEqual(["000:101"]);

    await user.click(partei2);
    expect(getFormData().getAll(referenzName)).toEqual(["000:101", "001:101"]);

    await user.click(partei1);
    expect(getFormData().getAll(referenzName)).toEqual(["001:101"]);
  });

  it("labels referenceable Beklagte as such", () => {
    renderFieldset(
      { beteiligtenart: "raKanzlei", rollen: [vertretungRolle] },
      {
        referenceableParteiRollen: [
          {
            rollennummer: "000:028",
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
          },
        ],
      },
    );

    expect(
      screen.getByRole("checkbox", {
        name: t.beklagtePartei.title.replace("{{number}}", "1"),
      }),
    ).toBeInTheDocument();
  });

  it("does not offer represented Parteien if there are none to reference", () => {
    renderFieldset({ beteiligtenart: "raKanzlei", rollen: [vertretungRolle] });

    expect(
      screen.queryByRole("group", { name: t.vertretungReferenzen }),
    ).not.toBeInTheDocument();
  });

  it("does not offer represented Parteien for a Partei", () => {
    renderFieldset(
      {
        beteiligtenart: "natuerlichePerson",
        rollen: [
          {
            rollennummer: "000:101",
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          },
        ],
      },
      {
        referenceableParteiRollen: [
          {
            rollennummer: "000:101",
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          },
        ],
      },
    );

    expect(
      screen.queryByRole("group", { name: t.vertretungReferenzen }),
    ).not.toBeInTheDocument();
  });

  it("shows field errors", () => {
    renderFieldset(
      { beteiligtenart: "natuerlichePerson" },
      {
        errors: {
          "beteiligungen[3][nachname]": ["Bitte geben Sie einen Nachnamen an."],
        },
      },
    );

    expect(
      screen.getByRole("textbox", { name: labels.nachname }),
    ).toBeInvalid();
    expect(screen.getByRole("textbox", { name: labels.vorname })).toBeValid();
    expect(
      screen.getByText("Bitte geben Sie einen Nachnamen an."),
    ).toBeInTheDocument();
  });
});
