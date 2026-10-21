import { expect, Locator, Page } from "@playwright/test";
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
  readonly siteFooter: SiteFooter;

  constructor(page: Page, pathOrURLPattern: URLPattern | string) {
    this.page = page;
    this.urlPattern =
      typeof pathOrURLPattern === "string"
        ? new URLPattern({ pathname: pathOrURLPattern })
        : pathOrURLPattern;

    this.siteHeader = new SiteHeader(this.page);
    this.siteFooter = new SiteFooter(this.page);
  }

  async waitUntilHere() {
    await this.page.waitForURL(this.urlPattern);
  }

  async expectToBeHere() {
    await expect(this.page).toHaveURL(this.urlPattern);
  }
}

/**
 * Base class for representing specific page sections in a `PageObject`.
 * Each instance is associated with a specific element through a Playwright
 * `Locator`.
 */
export class PageSectionObject {
  readonly page: Page;
  readonly locator: Locator;

  constructor(page: Page, locator: Locator) {
    this.page = page;
    this.locator = locator;
  }

  async expectToBeVisible() {
    await expect(this.locator).toBeVisible();
  }
}

/**
 * Page object representation of the current page's site header (if any).
 * Can be accessed from any page object through the `siteHeader` property.
 */
export class SiteHeader extends PageSectionObject {
  constructor(page: Page) {
    super(page, page.getByRole("banner"));
  }

  get dachmarkeKopfzeile() {
    return this.locator.locator(".kern-kopfzeile");
  }

  async expectDisplayedUserName(name: string) {
    const element = this.locator.getByTestId("current-user-name");
    await expect(element).toHaveText(name);
  }

  async logOut() {
    const button = this.locator.getByRole("button", {
      name: t.layout.header.logout,
    });
    await button.click();
  }
}

/**
 * Page object representation of the current page's site footer (if any).
 * Can be accessed from any page object through the `siteFooter` property.
 */
export class SiteFooter extends PageSectionObject {
  constructor(page: Page) {
    super(page, page.getByRole("contentinfo"));
  }
}
