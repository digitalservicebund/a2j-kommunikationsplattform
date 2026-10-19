import { Page } from "@playwright/test";
import { PageObject } from "./base";

export class DokumentDateiPage extends PageObject {
  readonly path: string;

  constructor(page: Page, path: string) {
    super(page, new URL(path, "http://localhost").pathname);
    this.path = path;
  }

  async visit() {
    await this.page.goto(this.path);
  }
}
