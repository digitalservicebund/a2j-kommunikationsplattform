// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { getTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import { TranslationsProvider } from "~/services/translations/context";
import type { EinreichungDetails } from "../VerfahrenAktuelleEinreichungSection";
import type { DokumentWithValidierungsstatus } from "../VerfahrenDokumenteList";
import VerfahrenWeitereEinreichungSection from "../VerfahrenWeitereEinreichungSection";

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
  } as DokumentWithValidierungsstatus;
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
  } as EinreichungDetails;
}

function renderSection(weitereEinreichung: EinreichungDetails) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: (
        <TranslationsProvider value={getTestTranslations()}>
          <VerfahrenWeitereEinreichungSection
            weitereEinreichung={weitereEinreichung}
          />
        </TranslationsProvider>
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
}

const submitButtonName = "Einreichen & Abgabe ans Gericht";

describe("VerfahrenWeitereEinreichungSection", () => {
  it("offers both Sichtbarkeit options, defaulting to Alle Parteien", () => {
    renderSection(buildWeitereEinreichung([]));

    const alle = screen.getByRole("radio", { name: "Alle Parteien" });
    const nurGericht = screen.getByRole("radio", {
      name: "Nur Gericht und zugeordnete Partei",
    });

    expect(alle).toBeChecked();
    expect(alle).toHaveAttribute("value", "true");
    expect(nurGericht).not.toBeChecked();
    expect(nurGericht).toHaveAttribute("value", "false");
    expect(screen.getByLabelText("Datei hochladen")).toBeInTheDocument();
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
        getTestTranslations().routes.verfahrenNeu.step3.summary.badgeLabels
          .checking,
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
        getTestTranslations().routes.verfahrenNeu.step3.summary.badgeLabels
          .checkedClean,
      ),
    ).toBeInTheDocument();
  });
});
