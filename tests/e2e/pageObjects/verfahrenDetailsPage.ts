import { expect, Page } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import { PageObject, PageSectionObject } from "./base";

const t = getTestTranslations();

type DisplayedEinreichungStatus = keyof typeof t.shared.status.einreichung;
type DisplayedDraftEinreichungStatus =
  keyof typeof t.routes.verfahrenId.draftKlageeinreichung.summary.badgeLabels;

export class VerfahrenDetailsPage extends PageObject {
  readonly overview: VerfahrenDetailsOverviewSection;
  readonly timeline: VerfahrenDetailsTimelineSection;

  constructor(page: Page) {
    super(page, "/verfahren/:id");
    this.overview = new VerfahrenDetailsOverviewSection(page);
    this.timeline = new VerfahrenDetailsTimelineSection(page);
  }
}

export class VerfahrenDetailsOverviewSection extends PageSectionObject {
  constructor(page: Page) {
    super(page, page.getByTestId("verfahren-overview-card"));
  }
}

export class VerfahrenDetailsTimelineSection extends PageSectionObject {
  constructor(page: Page) {
    super(
      page,
      page.getByRole("region", { name: t.routes.verfahrenId.timelineHeading }),
    );
  }

  entryByTitle(title: string) {
    return new VerfahrenDetailsTimelineEntry(this, title);
  }

  get draftKlageeinreichung() {
    return new DraftKlageeinreichungTimelineEntry(this);
  }
}

export class VerfahrenDetailsTimelineEntry extends PageSectionObject {
  constructor(parent: VerfahrenDetailsTimelineSection, title: string) {
    super(
      parent.page,
      parent.locator
        .getByRole("article")
        .filter({ has: parent.page.getByRole("heading", { name: title }) }),
    );
  }

  async expectDisplayedStatus(status: DisplayedEinreichungStatus) {
    const label = t.shared.status.einreichung[status];
    await expect(this.locator.getByText(label)).toBeVisible();
  }
}

export class DraftKlageeinreichungTimelineEntry extends PageSectionObject {
  constructor(parent: VerfahrenDetailsTimelineSection) {
    super(
      parent.page,
      parent.locator.getByTestId("klageeinreichung-timeline-step"),
    );
  }

  async expectDocumentToBeListed(filename: string) {
    await expect(this.locator).toContainText(filename);
  }

  async expectDisplayedStatus(status: DisplayedDraftEinreichungStatus) {
    const { badgeLabels } = t.routes.verfahrenId.draftKlageeinreichung.summary;
    const label = badgeLabels[status];
    await expect(this.locator.getByText(label)).toBeVisible({
      // The change of the status to "ready" ("Bereit zur Abgabe") can
      // sometimes take a while as the asynchronous virus scanning process
      // has to run on all Dokumente first.
      timeout: 120_000,
    });
  }

  async submit() {
    await this.page
      .getByRole("button", {
        name: t.routes.verfahrenId.draftKlageeinreichung.proceduralSteps
          .einreichung.submit,
      })
      .click();
  }
}
