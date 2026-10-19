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

export class VerfahrenCreationStep1Page extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu");
  }

  async selectKlageschriftFile(testDataFileName: string) {
    await this.page
      .getByLabel(t.shared.form.uploadDokument.label)
      .setInputFiles(getTestDataFilePath(testDataFileName));
  }

  async enterVerfahrensgegenstand(value: string) {
    await this.page
      .getByRole("textbox", { name: t.shared.form.labels.verfahrensgegenstand })
      .fill(value);
  }

  async selectEmpfaengergericht(name: string) {
    await this.page
      .getByRole("combobox", { name: t.shared.form.labels.empfaengergericht })
      .selectOption({ label: name });
  }

  async submit() {
    await this.page
      .getByRole("button", {
        name: t.routes.verfahrenNeu.step1.navigation.next,
      })
      .click();
  }
}

export class VerfahrenCreationStep2Page extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu/:id/bearbeiten");
  }

  get #klagendeParteiFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.step2.form.klagendePartei.title,
    });
  }

  get #klagendeParteiProzessbevollmaechtigteFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.step2.form.klagendePartei.vertretung.title,
    });
  }

  get #beklagteParteiFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.step2.form.beklagtePartei.title,
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
    const labels = t.routes.verfahrenNeu.step2.form.klagendePartei.vertretung;
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
        name: t.routes.verfahrenNeu.step2.form.klagendePartei.vertretung
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

  async uploadAnhang(testDataFileName: string) {
    await this.page
      .getByLabel(t.shared.form.uploadDokument.label)
      .setInputFiles(getTestDataFilePath(testDataFileName));
    await this.page
      .getByLabel(t.shared.form.selectDokumentType.label)
      .selectOption({ label: "Anhang" });
    await this.page
      .getByRole("button", {
        name: t.shared.form.uploadDokument.submit,
        exact: true,
      })
      .click();
  }

  async expectAnhangToHaveBeenUploaded(filename: string) {
    await expect(
      this.page.getByRole("listitem").filter({ hasText: filename }),
    ).toBeVisible();
  }

  async submit() {
    await this.page
      .getByRole("button", {
        name: t.routes.verfahrenNeu.step2.navigation.next,
      })
      .first()
      .click();
  }
}
