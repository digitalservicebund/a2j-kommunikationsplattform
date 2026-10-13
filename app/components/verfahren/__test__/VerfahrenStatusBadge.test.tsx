// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil.tsx";
import VerfahrenStatusBadge from "../VerfahrenStatusBadge.static";

const labels = getTestTranslations().shared.status.verfahren;

describe("VerfahrenStatusBadge", () => {
  it("renders the Verfahren status label with its state's icon", () => {
    const { container } = renderWithTestTranslations(
      <VerfahrenStatusBadge status="EINGEREICHT" />,
    );

    expect(screen.getByText(labels.eingereicht)).toBeInTheDocument();
    expect(container.querySelector(".kern-icon--schedule")).toBeInTheDocument();
  });
});
