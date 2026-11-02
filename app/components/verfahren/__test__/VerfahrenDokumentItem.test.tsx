// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
import formatDokumentSize from "../presentation/formatDokumentSize";
import VerfahrenDokumentItem from "../VerfahrenDokumentItem";

const dokument: Dokument = {
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
};

function renderItem(itemDokument: Dokument = dokument) {
  return renderWithTestTranslations(
    <VerfahrenDokumentItem
      dokument={itemDokument}
      verfahrenId="v-1"
      einreichungId="e-1"
    />,
  );
}

describe("VerfahrenDokumentItem", () => {
  it("links the file name to the inline file, opened in a new tab", () => {
    renderItem();

    const link = screen.getByRole("link", {
      name: "Klageschrift.pdf (öffnet in neuem Tab)",
    });
    expect(link).toHaveAttribute(
      "href",
      "/verfahren/v-1/einreichungen/e-1/dokumente/d-1/datei?disposition=inline",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a download button next to the file name", () => {
    renderItem();

    const downloadLink = screen.getByRole("link", {
      name: "Klageschrift.pdf herunterladen",
    });
    expect(downloadLink).toHaveAttribute(
      "href",
      "/verfahren/v-1/einreichungen/e-1/dokumente/d-1/datei?disposition=attachment",
    );
    expect(downloadLink).not.toHaveAttribute("target");
  });

  it("shows typ, name, size, date, status and actions in one row, in that order", () => {
    const { container } = renderWithTestTranslations(
      <VerfahrenDokumentItem
        dokument={dokument}
        verfahrenId="v-1"
        einreichungId="e-1"
        typLabel="Klageschrift"
        validierungsstatus={{
          validierungslaufStatus: "ABGESCHLOSSEN",
          ergebnis: "GRUEN",
          fehler: [],
        }}
        sichtbarkeit={<button type="button">Sichtbarkeit</button>}
        deleteAction={<button type="button">Entfernen</button>}
      />,
    );

    const cells = Array.from(container.firstElementChild?.children ?? []);
    expect(cells.map((cell) => cell.textContent)).toEqual([
      "Klageschrift",
      "Klageschrift.pdf (öffnet in neuem Tab)",
      formatDokumentSize(1234),
      `hochgeladen am ${new Date(dokument.erstelltAm).toLocaleDateString()}`,
      expect.stringContaining("Geprüft und virenfrei"),
      "SichtbarkeitKlageschrift.pdf herunterladenEntfernen",
    ]);
  });

  it.each([
    ["SCHRIFTSTUECK", "Schriftstück", "kern-icon--description"],
    ["ANHANG", "Anlage", "kern-icon--attach-file"],
    ["SIGNATURDATEI", "Signaturdatei", "kern-icon--signature"],
  ] as const)("shows an icon labelled with the typ %s", (typ, label, icon) => {
    renderItem({ ...dokument, typ });

    const iconWrapper = screen.getByText(label).parentElement;
    expect(iconWrapper?.querySelector(`.${icon}`)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("shows no status without a Validierungsstatus", () => {
    renderItem();

    expect(screen.queryByText("Geprüft und virenfrei")).not.toBeInTheDocument();
  });
});
