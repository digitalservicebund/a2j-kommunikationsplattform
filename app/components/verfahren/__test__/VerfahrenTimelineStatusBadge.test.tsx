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
  it.each([
    ["BEANTRAGT", labels.beantragt],
    ["VERSENDET", labels.versendet],
  ] as const)("shows a loader while the Einreichung is %s", (status, label) => {
    const { container } = renderWithTestTranslations(
      <VerfahrenTimelineStatusBadge status={status} />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.querySelector(".kern-loader")).toBeInTheDocument();
  });

  it.each([
    ["ERSTELLT", labels.erstellt],
    ["EINGEREICHT", labels.eingereicht],
    ["FEHLGESCHLAGEN", labels.fehlgeschlagen],
  ] as const)("shows no loader once the Einreichung is %s", (status, label) => {
    const { container } = renderWithTestTranslations(
      <VerfahrenTimelineStatusBadge status={status} />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.querySelector(".kern-loader")).not.toBeInTheDocument();
  });
});
