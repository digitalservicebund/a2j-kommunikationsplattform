// @vitest-environment jsdom

import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { actionError } from "~/utils/actionResult";
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
  };
}

const klageeinreichung = { id: "e-1", name: "Klageeinreichung" };

function renderList(
  dokumente: DokumentWithValidierungsstatus[],
  einreichung = klageeinreichung,
  options: { allowSchriftstueck?: boolean; disabled?: boolean } = {},
) {
  const Stub = createRoutesStub([
    {
      path: "/verfahren/:id",
      Component: () => (
        <VerfahrenDokumenteList
          verfahrenId="v-1"
          dokumente={dokumente}
          einreichung={einreichung}
          {...options}
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

  it("hides the delete action for a Schriftstück of the Klageeinreichung", () => {
    const { container } = renderList([buildDokument({ typ: "SCHRIFTSTUECK" })]);

    expect(
      screen.queryByRole("button", { name: /entfernen/i }),
    ).not.toBeInTheDocument();
    // An invisible placeholder keeps the controls aligned with other rows
    expect(
      container.querySelector('.kern-btn.invisible[aria-hidden="true"]'),
    ).toBeInTheDocument();
  });

  it("shows a delete action for a Schriftstück of a Weitere Einreichung", () => {
    renderList([buildDokument({ typ: "SCHRIFTSTUECK", id: "d-1" })], {
      id: "e-2",
      name: "Schriftsatz",
    });

    const deleteButton = screen.getByRole("button", { name: /entfernen/i });
    expect(deleteButton.closest("form")).toHaveFormValues({
      formType: "delete",
      einreichungId: "e-2",
      dokumentId: "d-1",
    });
  });

  it("shows a delete action for a deletable Dokument", () => {
    renderList([buildDokument({ typ: "ANHANG", id: "d-1" })]);

    // Names the Dokument, so the buttons of several Dokumente can be told apart
    const deleteButton = screen.getByRole("button", {
      name: "Klageschrift.pdf entfernen",
    });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.closest("form")).toHaveFormValues({
      formType: "delete",
      einreichungId: "e-1",
      dokumentId: "d-1",
    });
  });

  it("shows a failed delete next to the Dokument it was for", async () => {
    const Stub = createRoutesStub([
      {
        path: "/verfahren/:id",
        Component: () => (
          <VerfahrenDokumenteList
            verfahrenId="v-1"
            dokumente={[
              buildDokument({ id: "d-1", typ: "ANHANG", anzeigename: "a.pdf" }),
              buildDokument({ id: "d-2", typ: "ANHANG", anzeigename: "b.pdf" }),
            ]}
            einreichung={klageeinreichung}
          />
        ),
        action: () =>
          actionError("Löschen fehlgeschlagen.", {
            data: { formType: "delete", dokumentId: "d-2" },
          }),
      },
    ]);
    render(<Stub initialEntries={["/verfahren/v-1"]} />);

    const [, secondDeleteButton] = screen.getAllByRole("button", {
      name: /entfernen/i,
    });
    await userEvent.click(secondDeleteButton);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Löschen fehlgeschlagen.");
    // Rendered in the failed Dokument's own block, not the other one's.
    const dokumentBlock = alert.parentElement;
    expect(dokumentBlock).toHaveTextContent("b.pdf");
    expect(dokumentBlock).not.toHaveTextContent("a.pdf");
  });

  it("never shows the system-generated XJustiz Dokument", () => {
    renderList([
      buildDokument({ id: "d-1", typ: "XJUSTIZ", anzeigename: "xjustiz.xml" }),
    ]);

    expect(screen.getByText("Keine Dokumente vorhanden.")).toBeInTheDocument();
    expect(screen.queryByText("xjustiz.xml")).not.toBeInTheDocument();
  });

  it("lists the Dokumente as a labelled list", () => {
    renderList([
      buildDokument({ id: "d-1", typ: "ANHANG", anzeigename: "a.pdf" }),
      buildDokument({ id: "d-2", typ: "ANHANG", anzeigename: "b.pdf" }),
    ]);

    const list = screen.getByRole("list", { name: "Hochgeladene Dateien" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows each Dokument's type, the Schriftstück first", () => {
    renderList([
      buildDokument({ id: "d-1", typ: "ANHANG", anzeigename: "a.pdf" }),
      buildDokument({ id: "d-2", typ: "SIGNATURDATEI", anzeigename: "s.p7s" }),
      buildDokument({ id: "d-3", typ: "SCHRIFTSTUECK", anzeigename: "k.pdf" }),
    ]);

    const [first, second, third] = screen.getAllByRole("listitem");
    expect(first).toHaveTextContent(/k\.pdf.*Schriftstück ·/);
    expect(second).toHaveTextContent(/a\.pdf.*Anlage ·/);
    expect(third).toHaveTextContent(/s\.p7s.*Signaturdatei ·/);
  });

  it("can call the Schriftstück by another name", () => {
    const Stub = createRoutesStub([
      {
        path: "/verfahren/:id",
        Component: () => (
          <VerfahrenDokumenteList
            verfahrenId="v-1"
            dokumente={[buildDokument({ typ: "SCHRIFTSTUECK" })]}
            einreichung={klageeinreichung}
            schriftstueckLabel="Klageschrift"
          />
        ),
      },
    ]);
    render(<Stub initialEntries={["/verfahren/v-1"]} />);

    expect(screen.getByRole("listitem")).toHaveTextContent("Klageschrift ·");
  });

  it("lets each Dokument be opened and downloaded", () => {
    renderList([
      buildDokument({ id: "d-1", typ: "ANHANG", anzeigename: "a.pdf" }),
    ]);

    const dateiPath = "/verfahren/v-1/einreichungen/e-1/dokumente/d-1/datei";
    expect(
      screen.getByRole("link", { name: "a.pdf (öffnet in neuem Tab)" }),
    ).toHaveAttribute("href", `${dateiPath}?disposition=inline`);
    expect(
      screen.getByRole("link", { name: "a.pdf herunterladen" }),
    ).toHaveAttribute("href", `${dateiPath}?disposition=attachment`);
  });

  it("lets each Dokument's Sichtbarkeit be changed", () => {
    renderList([
      buildDokument({
        id: "d-1",
        typ: "ANHANG",
        anzeigename: "a.pdf",
        sichtbarkeitAlle: false,
      }),
    ]);

    expect(screen.getByLabelText("Sichtbarkeit von a.pdf")).toHaveValue(
      "false",
    );
  });

  it("allows deleting the Klageschrift where it's replaceable", () => {
    renderList([buildDokument({ typ: "SCHRIFTSTUECK" })], klageeinreichung, {
      allowSchriftstueck: true,
    });

    expect(
      screen.getByRole("button", { name: "Klageschrift.pdf entfernen" }),
    ).toBeInTheDocument();
  });

  it("keeps the delete button focusable but blocks it while disabled", () => {
    renderList(
      [buildDokument({ typ: "ANHANG", anzeigename: "a.pdf" })],
      klageeinreichung,
      { disabled: true },
    );

    const button = screen.getByRole("button", { name: "a.pdf entfernen" });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(fireEvent.click(button)).toBe(false);
    expect(screen.getByLabelText("Sichtbarkeit von a.pdf")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
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
