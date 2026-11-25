import { expect, Page } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import { getDefinitionByTermLabel } from "../utils/locators";
import { PageObject } from "./base";

const t = getTestTranslations();

export class BeitrittscodePage extends PageObject {
  constructor(page: Page) {
    super(page, "/beitreten");
  }

  get #beitrittscodeInput() {
    return this.page.getByLabel(t.routes.beitreten.code.label);
  }

  async enterBeitrittscode(value: string) {
    await this.#beitrittscodeInput.fill(value);
  }

  async submit() {
    await this.page
      .getByRole("button", { name: t.routes.beitreten.validateCode })
      .click();
  }

  async expectInvalidCodeFeedback() {
    const input = this.#beitrittscodeInput;
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      t.routes.beitreten.code.hint + " " + t.routes.beitreten.code.invalid,
    );
  }
}

export class BeitrittscodeConfirmationPage extends PageObject {
  constructor(page: Page, code: string) {
    super(
      page,
      new URLPattern({
        pathname: "/beitreten",
        search: new URLSearchParams({ code }).toString(),
      }),
    );
  }

  get safeIdSelect() {
    return this.page.getByRole("combobox", {
      name: t.routes.safeIdAuswahl.label,
    });
  }

  get kurzrubrum() {
    return getDefinitionByTermLabel(this.page, t.shared.kurzrubrum.label);
  }

  get gericht() {
    return getDefinitionByTermLabel(this.page, t.shared.gericht.label);
  }

  get aktenzeichenGericht() {
    return getDefinitionByTermLabel(this.page, t.shared.gericht.azLabel);
  }

  get klagendePartei() {
    return getDefinitionByTermLabel(
      this.page,
      t.shared.beteiligte.klaegerLabel,
    );
  }

  get beklagtePartei() {
    return getDefinitionByTermLabel(
      this.page,
      t.shared.beteiligte.beklagteLabel,
    );
  }

  async expectKurzrubrumDisplayed(value?: string) {
    await expect(
      getDefinitionByTermLabel(this.page, t.shared.kurzrubrum.label),
    ).toHaveText(value ?? /\S/);
  }

  async expectGerichtDisplayed(value?: string) {
    await expect(
      getDefinitionByTermLabel(this.page, t.shared.gericht.label),
    ).toHaveText(value ?? /\S/);
  }

  async expectAktenzeichenGerichtDisplayed(value?: string) {
    await expect(
      getDefinitionByTermLabel(this.page, t.shared.gericht.azLabel),
    ).toHaveText(value ?? /\S/);
  }

  async expectKlagendeParteiDisplayed(value?: string) {
    await expect(
      getDefinitionByTermLabel(this.page, t.shared.beteiligte.klaegerLabel),
    ).toHaveText(value ?? /\S/);
  }

  async expectBeklagteParteiDisplayed(value?: string) {
    await expect(
      getDefinitionByTermLabel(this.page, t.shared.beteiligte.beklagteLabel),
    ).toHaveText(value ?? /\S/);
  }

  async confirm() {
    await this.page
      .getByRole("button", { name: t.routes.beitreten.joinVerfahren.label })
      .click();
  }
}
