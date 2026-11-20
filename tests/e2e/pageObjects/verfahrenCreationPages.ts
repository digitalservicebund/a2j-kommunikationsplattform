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
  geschaeftszeichen?: string;
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  ort: string;
  email?: string;
  telefon?: string;
};

export class VerfahrenNeuPage extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu");
  }

  get safeIdSelect() {
    return this.page.getByRole("combobox", {
      name: t.routes.safeIdAuswahl.label,
    });
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

  #typLabel(typ: UploadDokumentType) {
    return typ === "SCHRIFTSTUECK"
      ? t.routes.verfahrenNeu.dokumente.schriftstueckLabel
      : t.shared.dokumentType[typ];
  }

  // The type is an icon, named by its title
  #uploadedDokument(typ: UploadDokumentType, filename: string) {
    return this.page
      .getByRole("list", { name: t.shared.form.uploadedDokumenteListLabel })
      .getByRole("listitem")
      .filter({ hasText: filename })
      .filter({
        has: this.page.getByTitle(this.#typLabel(typ), { exact: true }),
      });
  }

  get nextButton() {
    return this.page.getByRole("link", {
      name: t.routes.verfahrenNeu.dokumente.navigation.next,
      exact: true,
    });
  }

  get disabledNextButton() {
    return this.page.getByRole("button", {
      name: t.routes.verfahrenNeu.dokumente.navigation.next,
    });
  }

  async expectSelectedSafeId(safeId: string) {
    await expect(this.page).toHaveURL(
      (url) => url.searchParams.get("safeId") === safeId,
    );
  }

  async upload(
    typ: Exclude<UploadDokumentType, "SIGNATURDATEI">,
    testDataFileName: string,
  ) {
    await this.page.getByRole("radio", { name: this.#typLabel(typ) }).check();
    await this.page
      .getByLabel(t.shared.form.uploadDokument.label)
      .setInputFiles(getTestDataFilePath(testDataFileName));
    await this.page
      .getByRole("button", {
        name: t.shared.form.dokumentUpload.submit,
        exact: true,
      })
      .click();
  }

  async expectDokumentToHaveBeenUploaded(
    typ: UploadDokumentType,
    filename: string,
  ) {
    await expect(this.#uploadedDokument(typ, filename)).toBeVisible();
  }

  // The virus check may still be running or already be done
  async expectValidierungsstatusToBeShown(
    typ: UploadDokumentType,
    filename: string,
  ) {
    const { checking, checkedClean } =
      t.routes.verfahrenId.draftKlageeinreichung.summary.badgeLabels;
    await expect(this.#uploadedDokument(typ, filename)).toContainText(
      new RegExp(`${checking}|${checkedClean}`),
    );
  }

  async next() {
    await this.nextButton.click();
  }

  // Set once the first upload has created the Verfahren
  get verfahrenId() {
    return new URL(this.page.url()).searchParams.get("verfahren");
  }
}

export class VerfahrenDetailsStepPage extends PageObject {
  constructor(page: Page) {
    super(page, "/verfahren/neu/details");
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

  get #klagendenseiteFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.klagendenseite.title,
    });
  }

  get #beklagtenseiteFieldset() {
    return this.page.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.beklagtenseite.title,
    });
  }

  get #firstKlagendeParteiFieldset() {
    return this.#klagendeParteiFieldset(1);
  }

  get #firstKlagendeParteiProzessbevollmaechtigteFieldset() {
    return this.#klagendeParteiProzessbevollmaechtigteFieldset(1);
  }

  get #firstBeklagteParteiFieldset() {
    return this.#beklagteParteiFieldset(1);
  }

  #klagendeParteiFieldset(n: number) {
    return this.#klagendenseiteFieldset.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.klagendePartei.title.replace(
        "{{number}}",
        String(n),
      ),
    });
  }

  #klagendeParteiProzessbevollmaechtigteFieldset(n: number) {
    return this.#klagendenseiteFieldset.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.prozessbevollmaechtigte.title.replace(
        "{{number}}",
        String(n),
      ),
    });
  }

  #beklagteParteiFieldset(n: number) {
    return this.#beklagtenseiteFieldset.getByRole("group", {
      name: t.routes.verfahrenNeu.beteiligte.form.beklagtePartei.title.replace(
        "{{number}}",
        String(n),
      ),
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
    await fieldset
      .getByRole("textbox", { name: t.shared.form.labels.bezeichnung })
      .fill(details.bezeichnung);
    await fieldset
      .getByRole("combobox", {
        name: t.routes.verfahrenNeu.beteiligte.form.kanzleiform,
      })
      .selectOption({ label: details.kanzleiform });
    if (details.geschaeftszeichen) {
      await fieldset
        .getByRole("textbox", {
          name: t.routes.verfahrenNeu.beteiligte.form.geschaeftszeichen,
        })
        .fill(details.geschaeftszeichen);
    }
    await this.#fillBasicBeteiligungDetils(fieldset, details);
  }

  async fillFirstKlagendePartei(details: NatuerlichePersonDetails) {
    await this.#fillNatuerlichePersonDetails(
      this.#firstKlagendeParteiFieldset,
      details,
    );
  }

  async fillFirstKlagendeParteiProzessbevollmaechtigte(
    details: KanzleiDetails,
  ) {
    await this.#fillKanzleiDetails(
      this.#firstKlagendeParteiProzessbevollmaechtigteFieldset,
      details,
    );
  }

  async fillFirstBeklagtePartei(details: NatuerlichePersonDetails) {
    await this.#fillNatuerlichePersonDetails(
      this.#firstBeklagteParteiFieldset,
      details,
    );
  }
  async addSecondKlagendePartei(details: NatuerlichePersonDetails) {
    await this.#klagendenseiteFieldset
      .getByRole("button", {
        name: t.routes.verfahrenNeu.beteiligte.form.addPartei,
      })
      .click();
    await this.#fillNatuerlichePersonDetails(
      this.#klagendeParteiFieldset(2),
      details,
    );
  }

  async selectProzessbevollmaechtigteForKlagendePartei(params: {
    parteiNumber: number;
    prozessbevollmaechtigteNumber: number;
  }) {
    const parteiTitle =
      t.routes.verfahrenNeu.beteiligte.form.klagendePartei.title.replace(
        "{{number}}",
        String(params.parteiNumber),
      );
    await this.#klagendeParteiProzessbevollmaechtigteFieldset(
      params.prozessbevollmaechtigteNumber,
    )
      .getByRole("checkbox", { name: parteiTitle })
      .check();
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
