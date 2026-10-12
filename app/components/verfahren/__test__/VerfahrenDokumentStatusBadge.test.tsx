// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  getTestTranslations,
  renderWithTestTranslations,
} from "~tests/utils/translationsUtil.tsx";
import VerfahrenDokumentStatusBadge from "../VerfahrenDokumentStatusBadge";

const labels =
  getTestTranslations().routes.verfahrenId.draftKlageeinreichung.summary
    .badgeLabels;

describe("VerfahrenDokumentStatusBadge", () => {
  it("shows a loader while the Validierungslauf is running", () => {
    const { container } = renderWithTestTranslations(
      <VerfahrenDokumentStatusBadge
        validierungsstatus={{
          validierungslaufStatus: "LAEUFT",
          ergebnis: "NICHT_VERFUEGBAR",
          fehler: [],
        }}
      />,
    );

    expect(screen.getByText(labels.checking)).toBeInTheDocument();
    expect(container.querySelector(".kern-loader")).toBeInTheDocument();
  });

  it("labels a clean Dokument as checked, without a loader", () => {
    const { container } = renderWithTestTranslations(
      <VerfahrenDokumentStatusBadge
        validierungsstatus={{
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "GRUEN",
          fehler: [],
        }}
      />,
    );

    expect(screen.getByText(labels.checkedClean)).toBeInTheDocument();
    expect(container.querySelector(".kern-loader")).not.toBeInTheDocument();
  });
});
