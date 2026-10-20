// @vitest-environment jsdom

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";
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

function renderItem() {
  return renderWithTestTranslations(
    <VerfahrenDokumentItem
      dokument={dokument}
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
});
