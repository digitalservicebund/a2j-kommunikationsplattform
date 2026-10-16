import { expect, Page } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";

const t = getTestTranslations();

/**
 * Base class for implementing the [Page Object pattern][1], which we use to
 * encapsulate the structural details of the pages that the end-to-end tests
 * interact with.
 *
 * The basic idea is that every type of page is represented by a dedicated
 * page object class, and each query or interaction that needs to be performed
 * by tests is encapsulated by a method. For instance, instead of using the
 * Playwright API directly like this:
 *
 * ```ts
 * await page.goto("/login")
 * await page.getByRole("button", "beA-Login").click()
 * // ...
 * ```
 *
 * a test interacts with the page via a page object instead:
 *
 * ```ts
 * const loginPage = new LoginPage(page)
 * await loginPage.visit()
 * await loginPage.startBeALogin()
 * // ...
 * ```
 *
 * [1]: https://martinfowler.com/bliki/PageObject.html
 */
export class PageObject {
  protected readonly page: Page;
  protected readonly urlPattern: URLPattern;

  readonly siteHeader: SiteHeader;

  constructor(page: Page, pathOrURLPattern: URLPattern | string) {
    this.page = page;
    this.urlPattern =
      typeof pathOrURLPattern === "string"
        ? new URLPattern({ pathname: pathOrURLPattern })
        : pathOrURLPattern;

    this.siteHeader = new SiteHeader(this.page);
  }

  async waitUntilHere() {
    await this.page.waitForURL(this.urlPattern);
  }

  async expectToBeHere() {
    await expect(this.page).toHaveURL(this.urlPattern);
  }
}

/**
 * Page object representation of the current page's site header (if any).
 * Can be accessed from any page object through the `siteHeader` property.
 */
export class SiteHeader {
  #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  get dachmarkeKopfzeile() {
    return this.#page.locator(".kern-kopfzeile");
  }

  async expectDisplayedUserName(name: string) {
    const element = this.#page.getByTestId("current-user-name");
    await expect(element).toHaveText(name);
  }

  async logOut() {
    const button = this.#page.getByRole("button", {
      name: t.layout.header.logout,
    });
    await button.click();
  }
}
