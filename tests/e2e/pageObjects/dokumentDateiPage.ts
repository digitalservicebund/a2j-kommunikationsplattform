import { Page } from "@playwright/test";
import { PageObject } from "./base";

type DokumentDateiPageParams = {
  verfahrenId: string;
  einreichungId: string;
  dokumentId: string;
};

export class DokumentDateiPage extends PageObject {
  readonly path: string;

  constructor(
    page: Page,
    { verfahrenId, einreichungId, dokumentId }: DokumentDateiPageParams,
  ) {
    const pathname = `/verfahren/${verfahrenId}/einreichungen/${einreichungId}/dokumente/${dokumentId}/datei`;
    super(page, pathname);
    this.path = `${pathname}?disposition=attachment`;
  }

  async visit() {
    await this.page.goto(this.path);
  }
}
