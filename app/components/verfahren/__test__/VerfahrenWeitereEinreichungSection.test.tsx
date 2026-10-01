// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { getTestTranslations } from "tests/utils/translationsUtil";
import { describe, expect, it } from "vitest";
import { TranslationsProvider } from "~/services/translations/context";
import type { EinreichungDetails } from "../VerfahrenDraftKlageeinreichungSection";
import VerfahrenWeitereEinreichungSection from "../VerfahrenWeitereEinreichungSection";

const draftWeitereEinreichung = {
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
  dokumente: [],
  beleg: null,
} as unknown as EinreichungDetails;

function renderSection(draft: EinreichungDetails | null) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: (
        <TranslationsProvider value={getTestTranslations()}>
          <VerfahrenWeitereEinreichungSection draftWeitereEinreichung={draft} />
        </TranslationsProvider>
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
}

const artLabel = "Art der Einreichung";
const uploadButtonName = "Hochladen";

describe("VerfahrenWeitereEinreichungSection", () => {
  it("lets the Art be picked while there is no draft yet", () => {
    renderSection(null);

    expect(screen.getByLabelText(artLabel)).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(
      screen.queryByRole("button", { name: uploadButtonName }),
    ).not.toBeInTheDocument();
  });

  it("fixes the Art and shows the draft once it exists", () => {
    renderSection(draftWeitereEinreichung);

    const artSelect = screen.getByLabelText(artLabel);
    expect(artSelect).toHaveAttribute("aria-disabled", "true");
    expect(artSelect).toHaveValue("Schriftsatz");
    expect(
      screen.getByRole("button", { name: uploadButtonName }),
    ).toBeInTheDocument();
  });
});
