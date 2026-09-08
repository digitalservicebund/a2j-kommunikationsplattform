// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";
import VerfahrenDokumenteList, {
  DokumentWithValidierungsstatus,
} from "../VerfahrenDokumenteList";

function buildDokument(
  overrides: Partial<DokumentWithValidierungsstatus>,
): DokumentWithValidierungsstatus {
  return {
    id: "d-1",
    status: "ERSTELLT",
    validierungslaufStatus: "ABGESCHLOSSEN",
    dateiname: "klageschrift.pdf",
    anzeigename: "Klageschrift.pdf",
    sizeInBytes: 1234,
    contentType: "application/pdf",
    hash: "abc",
    hashAlgorithmus: "SHA3-384",
    typ: "SCHRIFTSTUECK",
    gesendetAm: null,
    eingereichtAm: null,
    erstelltVon: "user",
    erstelltAm: "2026-08-24T15:18:20.000Z",
    sichtbarkeitAlle: true,
    validierungsstatus: {
      validierungslaufStatus: "ABGESCHLOSSEN",
      ergebnis: "GRUEN",
      fehler: [],
    },
    ...overrides,
  } as DokumentWithValidierungsstatus;
}

function renderList(
  dokumente: DokumentWithValidierungsstatus[],
  einreichungId = "e-1",
) {
  const Stub = createRoutesStub([
    {
      path: "/verfahren/:id",
      Component: () => (
        <VerfahrenDokumenteList
          dokumente={dokumente}
          einreichungId={einreichungId}
        />
      ),
      action: vi.fn(),
    },
  ]);

  return render(<Stub initialEntries={["/verfahren/v-1"]} />);
}

describe("VerfahrenDokumenteList", () => {
  it("shows the empty state when there are no Dokumente", () => {
    renderList([]);

    expect(screen.getByText("Keine Dokumente vorhanden.")).toBeInTheDocument();
  });

  it("shows each Dokument's own upload date rather than a shared one", () => {
    renderList([
      buildDokument({
        id: "d-1",
        typ: "ANHANG",
        anzeigename: "Anlage-1.pdf",
        erstelltAm: "2026-08-01T00:00:00.000Z",
      }),
      buildDokument({
        id: "d-2",
        typ: "ANHANG",
        anzeigename: "Anlage-2.pdf",
        erstelltAm: "2026-08-20T00:00:00.000Z",
      }),
    ]);

    const firstDate = new Date("2026-08-01T00:00:00.000Z").toLocaleDateString();
    const secondDate = new Date(
      "2026-08-20T00:00:00.000Z",
    ).toLocaleDateString();

    expect(screen.getAllByText(firstDate, { exact: false })).not.toHaveLength(
      0,
    );
    expect(screen.getAllByText(secondDate, { exact: false })).not.toHaveLength(
      0,
    );
  });

  it("hides the delete action for a Schriftstück", () => {
    renderList([buildDokument({ typ: "SCHRIFTSTUECK" })]);

    expect(
      screen.queryByRole("button", { name: /entfernen/i }),
    ).not.toBeInTheDocument();
  });

  it("shows a delete action for a deletable Dokument", () => {
    renderList([buildDokument({ typ: "ANHANG", id: "d-1" })]);

    const deleteButton = screen.getByRole("button", { name: /entfernen/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.closest("form")).toHaveFormValues({
      formType: "delete",
      einreichungId: "e-1",
      dokumentId: "d-1",
    });
  });

  it("shows a validation Alert when a Dokument's ergebnis is ROT", () => {
    renderList([
      buildDokument({
        typ: "ANHANG",
        validierungsstatus: {
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "ROT",
          fehler: ["Datei ist beschädigt"],
        },
      }),
    ]);

    expect(screen.getByText("Datei ist beschädigt")).toBeInTheDocument();
  });
});
