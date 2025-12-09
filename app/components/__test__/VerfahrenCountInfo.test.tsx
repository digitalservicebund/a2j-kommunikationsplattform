// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { VerfahrenCountInfo } from "~/components/verfahren/VerfahrenCountInfo";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~/util/testUtils";

describe("VerfahrenCountInfo", () => {
  const { labels, alerts } = getTestTranslations();
  let container: HTMLElement;
  let getByText: ReturnType<typeof renderWithTestTranslations>["getByText"];
  let queryByRole: ReturnType<typeof renderWithTestTranslations>["queryByRole"];

  const renderComponent = (count: number, hasFilters: boolean) => {
    const rendered = renderWithTestTranslations(
      <VerfahrenCountInfo count={count} hasFilters={hasFilters} />,
    );
    container = rendered.container;
    getByText = rendered.getByText;
    queryByRole = rendered.queryByRole;
  };

  describe("count display", () => {
    describe("when there are no filters", () => {
      it("displays '0 Verfahren' when count is 0", () => {
        renderComponent(0, false);
        const text = container.querySelector("p");
        expect(text).toHaveTextContent(`0 ${labels.VERFAHREN_LABEL}`);
      });
      it("displays exact count when less than 100", () => {
        renderComponent(50, false);
        const text = container.querySelector("p");
        expect(text).toHaveTextContent(`50 ${labels.VERFAHREN_LABEL}`);
      });
      it("displays generic message when 100 or more", () => {
        renderComponent(100, false);
        const text = container.querySelector("p");
        expect(text).toHaveTextContent(labels.MORE_THAN_100_VERFAHREN_LABEL);
      });
    });
    describe("when there are filters", () => {
      it("displays '0 Ergebnisse' when count is 0", () => {
        renderComponent(0, true);
        const text = container.querySelector("p");
        expect(text).toHaveTextContent(`0 ${labels.RESULTS_LABEL}`);
      });
      it("displays exact count when less than 100", () => {
        renderComponent(30, true);
        const text = container.querySelector("p");
        expect(text).toHaveTextContent(`30 ${labels.VERFAHREN_LABEL}`);
      });
      it("displays generic message when 100 or more", () => {
        renderComponent(150, true);
        const text = container.querySelector("p");
        expect(text).toHaveTextContent(labels.MORE_THAN_100_VERFAHREN_LABEL);
      });
    });

    describe("alerts", () => {
      describe("when filters are applied", () => {
        it("shows no results alert when count is 0", () => {
          renderComponent(0, true);
          expect(
            getByText(alerts.NO_VERFAHREN_FOUND_TITLE),
          ).toBeInTheDocument();
          expect(
            getByText(alerts.NO_VERFAHREN_FOUND_MESSAGE),
          ).toBeInTheDocument();
        });
        it("shows too many results alert when count is greater than 50", () => {
          renderComponent(51, true);
          expect(getByText(alerts.TOO_MANY_RESULTS_TITLE)).toBeInTheDocument();
          expect(
            getByText(alerts.TOO_MANY_RESULTS_MESSAGE),
          ).toBeInTheDocument();
        });
        it("shows no alert when count is between 1 and 50", () => {
          renderComponent(25, true);
          expect(queryByRole("alert")).not.toBeInTheDocument();
        });
        describe("when no filters are applied", () => {
          it("shows no results alert when count is 0", () => {
            renderComponent(0, false);
            expect(
              getByText(alerts.NO_VERFAHREN_FOUND_TITLE),
            ).toBeInTheDocument();
            expect(
              getByText(alerts.NO_VERFAHREN_FOUND_MESSAGE),
            ).toBeInTheDocument();
          });
          it("shows too many results alert when count is greater than 50", () => {
            renderComponent(60, false);
            expect(
              getByText(alerts.TOO_MANY_RESULTS_TITLE),
            ).toBeInTheDocument();
            expect(
              getByText(alerts.TOO_MANY_RESULTS_MESSAGE),
            ).toBeInTheDocument();
          });
          it("shows no alert when count is between 1 and 50", () => {
            renderComponent(10, false);
            expect(queryByRole("alert")).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});
