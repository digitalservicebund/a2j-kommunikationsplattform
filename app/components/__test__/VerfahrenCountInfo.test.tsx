// @vitest-environment jsdom

import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/util/translationsUtil";
import { describe, expect, it } from "vitest";
import { VerfahrenCountInfo } from "~/components/verfahren/VerfahrenCountInfo";

describe("VerfahrenCountInfo", () => {
  const { labels, alerts } = getTestTranslations();
  let container: HTMLElement;
  let getByText: ReturnType<typeof renderWithTestTranslations>["getByText"];
  let queryByRole: ReturnType<typeof renderWithTestTranslations>["queryByRole"];

  const renderComponent = (count: number) => {
    const rendered = renderWithTestTranslations(
      <VerfahrenCountInfo count={count} />,
    );
    container = rendered.container;
    getByText = rendered.getByText;
    queryByRole = rendered.queryByRole;
  };

  describe("count display", () => {
    it("displays exact count when less than 100", () => {
      renderComponent(50);
      const text = container.querySelector("p");
      expect(text).toHaveTextContent(`50 ${labels.VERFAHREN_LABEL}`);
    });

    it("displays generic message when 100 or more", () => {
      renderComponent(100);
      const text = container.querySelector("p");
      expect(text).toHaveTextContent(labels.MORE_THAN_100_VERFAHREN_LABEL);
    });
  });

  describe("alerts", () => {
    it("shows no results alert when count is 0", () => {
      renderComponent(0);
      expect(getByText(alerts.NO_VERFAHREN_FOUND_TITLE)).toBeInTheDocument();
      expect(getByText(alerts.NO_VERFAHREN_FOUND_MESSAGE)).toBeInTheDocument();
    });

    it("shows too many results alert when count is greater than 50", () => {
      renderComponent(51);
      expect(getByText(alerts.TOO_MANY_RESULTS_TITLE)).toBeInTheDocument();
      expect(getByText(alerts.TOO_MANY_RESULTS_MESSAGE)).toBeInTheDocument();
    });

    it("shows no alert when count is between 1 and 50", () => {
      renderComponent(25);
      expect(queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});
