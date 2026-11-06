// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { createRef, type ReactNode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import type { Verfahren } from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { TranslationsProvider } from "~/services/translations/context";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import type { DokumentWithValidierungsstatus } from "../VerfahrenDokumenteList";
import VerfahrenDraftKlageeinreichungSection, {
  type EinreichungDetails,
} from "../VerfahrenDraftKlageeinreichungSection";

function renderWithRouter(children: ReactNode) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: (
        <TranslationsProvider value={getTestTranslations()}>
          {children}
        </TranslationsProvider>
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
}

const verfahren: Verfahren = {
  id: "verfahren-1",
  aktenzeichenGericht: "AZ-123",
  verfahrensgegenstand: "Zahlungsklage",
  kurzrubrum: "Müller ./. Weber",
  status: "ERSTELLT",
  statusGeaendertAm: "2026-01-01T00:00:00.000Z",
  erstelltVon: "user-1",
  erstelltAm: "2026-01-01T00:00:00.000Z",
  eingereichtAm: null,
  gericht: {
    id: "gericht-1",
    wert: "Landgericht Frankfurt",
    code: "LG_FFM",
  },
  beteiligungen: [],
};

const draftKlageeinreichung: EinreichungDetails = {
  einreichung: {
    id: "e-1",
    name: "Klageschrift",
    status: "ERSTELLT",
    erstelltVon: "user-1",
    erstelltAm: "2026-01-01T00:00:00.000Z",
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
};

const baseProps = {
  verfahren,
  validierungPresentation: null,
  hasValidationIssues: false,
  isValidating: false,
  isSubmitting: "idle" as const,
  formRef: createRef<HTMLFormElement>(),
  handleSubmit: vi.fn(),
};

describe("VerfahrenDraftKlageeinreichungSection", () => {
  it("renders the current Einreichung's basisdaten and shows the edit/submit footer when there is no Beleg yet", () => {
    const { getAllByText, getByRole } = renderWithRouter(
      <VerfahrenDraftKlageeinreichungSection
        {...baseProps}
        draftKlageeinreichung={draftKlageeinreichung}
      />,
    );

    // "Klageschrift" appears both in the basisdaten card title and in the
    // "Klageschrift hochgeladen" timeline step derived from it.
    expect(getAllByText(/Klageschrift/).length).toBeGreaterThan(0);
    expect(getByRole("button", { name: /einreichen/i })).toBeInTheDocument();
  });

  it("hides the edit/submit footer once a Beleg exists", () => {
    const { queryByRole } = renderWithRouter(
      <VerfahrenDraftKlageeinreichungSection
        {...baseProps}
        draftKlageeinreichung={{
          ...draftKlageeinreichung,
          beleg: {
            id: "beleg-1",
            erstelltAm: "2026-01-03T00:00:00.000Z",
            typ: null,
            status: "ERSTELLT",
            dateiname: "beleg.pdf",
            contentType: "application/pdf",
          },
        }}
      />,
    );

    expect(
      queryByRole("button", { name: /einreichen/i }),
    ).not.toBeInTheDocument();
  });

  it.each([
    ["disables", "without", [], true],
    ["enables", "with", [buildDokument("SCHRIFTSTUECK")], false],
  ] as const)(
    "%s submitting %s a Schriftstück",
    (_, __, dokumente, isDisabled) => {
      const { getByRole } = renderWithRouter(
        <VerfahrenDraftKlageeinreichungSection
          {...baseProps}
          draftKlageeinreichung={{
            ...draftKlageeinreichung,
            dokumente: [buildDokument("ANHANG"), ...dokumente],
          }}
        />,
      );

      const button = getByRole("button", { name: /einreichen/i });
      expect(button.hasAttribute("disabled")).toBe(isDisabled);
    },
  );
});

function buildDokument(
  typ: DokumentWithValidierungsstatus["typ"],
): DokumentWithValidierungsstatus {
  return {
    id: `d-${typ}`,
    status: "ERSTELLT",
    validierungslaufStatus: "ABGESCHLOSSEN",
    dateiname: `${typ}.pdf`,
    anzeigename: `${typ}.pdf`,
    sizeInBytes: 1234,
    contentType: "application/pdf",
    hash: "abc",
    hashAlgorithmus: "SHA3-384",
    typ,
    gesendetAm: null,
    eingereichtAm: null,
    erstelltVon: "user",
    erstelltAm: "2026-01-01T00:00:00.000Z",
    sichtbarkeitAlle: true,
    validierungsstatus: {
      validierungslaufStatus: "ABGESCHLOSSEN",
      ergebnis: "GRUEN",
      fehler: [],
    },
  };
}
