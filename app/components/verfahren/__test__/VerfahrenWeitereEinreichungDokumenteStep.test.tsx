// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { TranslationsProvider } from "~/services/translations/context";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import type { DokumentWithValidierungsstatus } from "../VerfahrenDokumenteList";
import type { EinreichungDetails } from "../VerfahrenDraftKlageeinreichungSection";
import VerfahrenWeitereEinreichungDokumenteStep from "../VerfahrenWeitereEinreichungDokumenteStep";

function buildDokument(
  validierungsstatus: DokumentWithValidierungsstatus["validierungsstatus"],
): DokumentWithValidierungsstatus {
  return {
    id: "d-1",
    status: "ERSTELLT",
    validierungslaufStatus: validierungsstatus.validierungslaufStatus,
    dateiname: "schriftsatz.pdf",
    anzeigename: "Schriftsatz.pdf",
    sizeInBytes: 1234,
    contentType: "application/pdf",
    hash: "abc",
    hashAlgorithmus: "SHA3-384",
    typ: "SCHRIFTSTUECK",
    gesendetAm: null,
    eingereichtAm: null,
    erstelltVon: "user",
    erstelltAm: "2026-09-01T00:00:00.000Z",
    sichtbarkeitAlle: true,
    validierungsstatus,
  };
}

function buildWeitereEinreichung(
  dokumente: DokumentWithValidierungsstatus[],
): EinreichungDetails {
  return {
    einreichung: {
      id: "e-2",
      name: "Schriftsatz",
      status: "ERSTELLT",
      erstelltVon: "user-1",
      erstelltAm: "2026-09-01T00:00:00.000Z",
      beantragtAm: null,
      gesendetAm: null,
      eingereichtAm: null,
      validierungsStatus: "AUSSTEHEND",
      einreichungsStatus: {
        validierungslaufStatus: "AUSSTEHEND",
        ergebnis: "NICHT_VERFUEGBAR",
        fehler: [],
      },
    },
    dokumente,
    beleg: null,
  };
}

function renderSection(weitereEinreichung: EinreichungDetails | null) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: (
        <TranslationsProvider value={getTestTranslations()}>
          <VerfahrenWeitereEinreichungDokumenteStep
            verfahrenId="v-1"
            draftWeitereEinreichung={weitereEinreichung}
          />
        </TranslationsProvider>
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
}

const submitButtonName = "Einreichen & Abgabe ans Gericht";

describe("VerfahrenWeitereEinreichungDokumenteStep", () => {
  it.each([
    ["there is no draft yet", null],
    ["nothing has been uploaded yet", buildWeitereEinreichung([])],
  ])("shows no Dokumente list while %s", (_, draft) => {
    renderSection(draft);

    expect(
      screen.queryByText("Keine Dokumente vorhanden."),
    ).not.toBeInTheDocument();
  });

  it("disables every control while there is no draft yet", () => {
    renderSection(null);

    for (const input of screen.getAllByLabelText("Datei hochladen")) {
      expect(input).toHaveAttribute("aria-disabled", "true");
    }
    expect(
      screen.getByRole("button", { name: submitButtonName }),
    ).toBeDisabled();
  });

  it("offers one upload area for every Dokument type", () => {
    renderSection(buildWeitereEinreichung([]));

    const typ = screen.getByRole("group", { name: "Art des Dokuments" });
    for (const name of ["Schriftstück", "Anlage", "Signaturdatei"]) {
      expect(within(typ).getByRole("radio", { name })).toBeInTheDocument();
    }
    expect(screen.getByLabelText("Datei hochladen")).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("lets an uploaded Dokument's Sichtbarkeit be changed", () => {
    renderSection(
      buildWeitereEinreichung([
        buildDokument({
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "GRUEN",
          fehler: [],
        }),
      ]),
    );

    expect(
      screen.getByLabelText("Sichtbarkeit von Schriftsatz.pdf"),
    ).toHaveValue("true");
  });

  it("disables submitting while no Dokument has been uploaded", () => {
    renderSection(buildWeitereEinreichung([]));

    expect(
      screen.getByRole("button", { name: submitButtonName }),
    ).toBeDisabled();
  });

  it("disables submitting and shows the checking badge while a Dokument is being validated", () => {
    renderSection(
      buildWeitereEinreichung([
        buildDokument({
          validierungslaufStatus: "AUSSTEHEND",
          ergebnis: "NICHT_VERFUEGBAR",
          fehler: [],
        }),
      ]),
    );

    expect(
      screen.getByRole("button", { name: submitButtonName }),
    ).toBeDisabled();
    expect(
      screen.getByText(
        getTestTranslations().routes.verfahrenId.draftKlageeinreichung.summary
          .badgeLabels.checking,
      ),
    ).toBeInTheDocument();
  });

  it("enables submitting once all Dokumente are validated", () => {
    renderSection(
      buildWeitereEinreichung([
        buildDokument({
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "GRUEN",
          fehler: [],
        }),
      ]),
    );

    expect(
      screen.getByRole("button", { name: submitButtonName }),
    ).toBeEnabled();
    expect(
      screen.getByText(
        getTestTranslations().routes.verfahrenId.draftKlageeinreichung.summary
          .badgeLabels.checkedClean,
      ),
    ).toBeInTheDocument();
  });

  it("offers deleting an uploaded Schriftstück", () => {
    renderSection(
      buildWeitereEinreichung([
        buildDokument({
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "GRUEN",
          fehler: [],
        }),
      ]),
    );

    expect(
      screen.getByRole("button", { name: /entfernen/i }),
    ).toBeInTheDocument();
  });
});
