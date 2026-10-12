// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import VerfahrenStatusBadge from "../VerfahrenStatusBadge.static";

const labels = getTestTranslations().shared.status.verfahren;

describe("VerfahrenStatusBadge", () => {
  it("renders the Verfahren status label with its state's icon", () => {
    const { container } = renderWithTestTranslations(
      <VerfahrenStatusBadge status="EINGEREICHT" small />,
    );

    expect(screen.getByText(labels.eingereicht)).toBeInTheDocument();
    expect(container.querySelector(".kern-icon--info")).toBeInTheDocument();
  });
});
