import { Page } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import { PageObject } from "./base";

const t = getTestTranslations();

export class LoginPage extends PageObject {
  constructor(page: Page) {
    super(page, "/login");
  }

  async visit() {
    await this.page.goto("/login");
  }

  get alert() {
    return this.page.getByRole("alert");
  }

  async startBeALogin() {
    const buttonName = t.buttons.LOGIN_BUTTON_BEA;
    const button = this.page.getByRole("button", { name: buttonName });
    await button.click();
  }

  async startKomPlaIdpLogin() {
    const buttonName = t.buttons.LOGIN_BUTTON_KOMPLA_IDP_LABEL;
    const button = this.page.getByRole("button", { name: buttonName });
    await button.click();
  }
}

export class BeALoginPage extends PageObject {
  constructor(page: Page) {
    super(page, new URLPattern("https://schulung.bea-brak.de/bea"));
  }
}

export class KomPlaIdpLoginPage extends PageObject {
  constructor(page: Page) {
    super(
      page,
      new URLPattern(
        "https://auth.kompla-justiz.sinc.de/realms/kompla-dev/protocol/openid-connect/auth",
      ),
    );
  }

  async enterUsername(value: string) {
    await this.page
      .getByRole("textbox", { name: "Username or email" })
      .fill(value);
  }

  async enterPassword(value: string) {
    await this.page.getByRole("textbox", { name: "Password" }).fill(value);
  }

  async submit() {
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }
}
