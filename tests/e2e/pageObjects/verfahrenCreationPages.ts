import { expect, Locator, Page } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import { getTestDataFilePath } from "../utils/e2TestData";
import { PageObject } from "./base";

const t = getTestTranslations();

type NatuerlichePersonDetails = {
  vorname: string;
  nachname: string;
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  ort: string;
  email?: string;
  telefon?: string;
};

type KanzleiDetails = {
  bezeichnung: string;
  kanzleiform: string;
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  ort: string;
  email?: string;
  telefon?: string;
};

export class GerichtAuswahlPage extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu/gericht-auswahl");
  }

  get komplaButton() {
    return this.page.getByRole("link", {
      name: t.routes.verfahrenGerichtAuswahl.klageEinreichenKompla,
    });
  }

  get eingabesystemButton() {
    return this.page.getByRole("link", {
      name: t.routes.verfahrenGerichtAuswahl.klageErstellenEingabesystem,
    });
  }

  async selectEmpfaengergericht(name: string) {
    await this.page
      .getByRole("combobox", { name: t.shared.form.labels.empfaengergericht })
      .selectOption({ label: name });
  }

  async startKomplaKlageeinreichung() {
    await this.komplaButton.click();
  }
}

type UploadDokumentType = "SCHRIFTSTUECK" | "ANHANG" | "SIGNATURDATEI";

export class VerfahrenDokumentePage extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu/dokumente");
  }

  #uploadBox(typ: UploadDokumentType) {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.dokumente.types[typ].title,
    });
  }

  get nextButton() {
    return this.page.getByRole("link", {
      name: t.routes.verfahrenNeu.dokumente.navigation.next,
    });
  }

  get disabledNextButton() {
    return this.page.getByRole("button", {
      name: t.routes.verfahrenNeu.dokumente.navigation.next,
    });
  }

  async upload(typ: UploadDokumentType, testDataFileName: string) {
    await this.#uploadBox(typ)
      .getByLabel(t.shared.form.uploadDokument.label)
      .setInputFiles(getTestDataFilePath(testDataFileName));
  }

  async expectDokumentToHaveBeenUploaded(
    typ: UploadDokumentType,
    filename: string,
  ) {
    await expect(
      this.#uploadBox(typ).getByRole("listitem").filter({ hasText: filename }),
    ).toBeVisible();
  }

  async next() {
    await this.nextButton.click();
  }
}

export class VerfahrenDetailsStepPage extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu/verfahrendetails");
  }

  get verfahrensgegenstandInput() {
    return this.page.getByRole("textbox", {
      name: t.shared.form.labels.subjectMatterOfTheProceedings,
    });
  }

  get empfaengergerichtSelect() {
    return this.page.getByRole("combobox", {
      name: t.shared.form.labels.empfaengergericht,
    });
  }

  async enterRubrum(value: string) {
    await this.page
      .getByRole("textbox", { name: t.shared.form.labels.rubrum })
      .fill(value);
  }

  async enterGeschaeftszeichenProzessbevollmaechigte(value: string) {
    await this.page
      .getByRole("textbox", {
        name: t.shared.form.labels.geschaeftszeichenProzessbevollmaechtigte,
      })
      .fill(value);
  }

  async next() {
    await this.page
      .getByRole("button", {
        name: t.routes.verfahrenNeu.verfahrendetails.navigation.next,
      })
      .click();
  }
}

export class VerfahrenBeteiligtePage extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu/beteiligte");
  }

  get #klagendeParteiFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.klagendePartei.title,
    });
  }

  get #klagendeParteiProzessbevollmaechtigteFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.klagendePartei.vertretung
        .title,
    });
  }

  get #beklagteParteiFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.beklagtePartei.title,
    });
  }

  async #fillBasicBeteiligungDetils(
    fieldset: Locator,
    details: NatuerlichePersonDetails | KanzleiDetails,
  ) {
    for (const key of [
      "strasse",
      "hausnummer",
      "postleitzahl",
      "ort",
      "email",
      "telefon",
    ] as const) {
      const value = details[key];
      if (value) {
        await fieldset
          .getByRole("textbox", { name: t.shared.form.labels[key] })
          .fill(value);
      }
    }
  }

  async #fillNatuerlichePersonDetails(
    fieldset: Locator,
    details: NatuerlichePersonDetails,
  ) {
    await fieldset
      .getByRole("textbox", { name: t.shared.form.labels.vorname })
      .fill(details.vorname);
    await fieldset
      .getByRole("textbox", { name: t.shared.form.labels.nachname })
      .fill(details.nachname);
    await this.#fillBasicBeteiligungDetils(fieldset, details);
  }

  async #fillKanzleiDetails(fieldset: Locator, details: KanzleiDetails) {
    const labels =
      t.routes.verfahrenNeu.beteiligte.form.klagendePartei.vertretung;
    await fieldset
      .getByRole("textbox", { name: labels.bezeichnung })
      .fill(details.bezeichnung);
    await fieldset
      .getByRole("combobox", { name: labels.kanzleiform })
      .selectOption({ label: details.kanzleiform });
    await this.#fillBasicBeteiligungDetils(fieldset, details);
  }

  async addKlagendePartei(details: NatuerlichePersonDetails) {
    await this.#fillNatuerlichePersonDetails(
      this.#klagendeParteiFieldset,
      details,
    );
  }

  async addKlagendeParteiProzessbevollmaechtigte(details: KanzleiDetails) {
    await this.page
      .getByRole("checkbox", {
        name: t.routes.verfahrenNeu.beteiligte.form.klagendePartei.vertretung
          .checkbox,
      })
      .check();
    await this.#fillKanzleiDetails(
      this.#klagendeParteiProzessbevollmaechtigteFieldset,
      details,
    );
  }

  async addBeklagtePartei(details: NatuerlichePersonDetails) {
    await this.#fillNatuerlichePersonDetails(
      this.#beklagteParteiFieldset,
      details,
    );
  }

  async submit() {
    await this.page
      .getByRole("button", {
        name: t.routes.verfahrenNeu.beteiligte.navigation.next,
      })
      .first()
      .click();
  }
}
