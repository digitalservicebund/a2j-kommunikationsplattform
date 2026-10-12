// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import VerfahrenTimelineStatusBadge from "../VerfahrenTimelineStatusBadge";

const labels = getTestTranslations().shared.status.einreichung;

describe("VerfahrenTimelineStatusBadge", () => {
  // Only a running Validierungslauf shows a loader; an Einreichung's own
  // status (even BEANTRAGT/VERSENDET) never does.
  it.each([
    ["ERSTELLT", labels.erstellt],
    ["BEANTRAGT", labels.beantragt],
    ["VERSENDET", labels.versendet],
    ["EINGEREICHT", labels.eingereicht],
    ["FEHLGESCHLAGEN", labels.fehlgeschlagen],
  ] as const)("shows no loader when the Einreichung is %s", (status, label) => {
    const { container } = renderWithTestTranslations(
      <VerfahrenTimelineStatusBadge status={status} />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.querySelector(".kern-loader")).not.toBeInTheDocument();
  });
});
