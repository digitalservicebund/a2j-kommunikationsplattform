import { Page } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import { PageObject } from "./base";

const t = getTestTranslations();

export class HomePage extends PageObject {
  constructor(page: Page) {
    super(page, "/");
  }

  get verfahrenTable() {
    return this.page.getByRole("table", {
      name: t.routes.index.verfahrenTableLabel,
    });
  }

  async visit() {
    await this.page.goto("/");
  }

  async startVerfahrenCreationFlow() {
    await this.page
      .getByRole("link", { name: t.routes.index.createVerfahren })
      .click();
  }

  async startBeitrittscodeFlow() {
    await this.page
      .getByRole("link", { name: t.routes.index.redeemBeitrittscode })
      .click();
  }
}
