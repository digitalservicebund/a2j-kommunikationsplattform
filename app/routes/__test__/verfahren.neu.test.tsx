// @vitest-environment jsdom

import { fireEvent } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";
import type { GerichtAuswahlOption } from "~/domains/verfahren/services/buildGerichtAuswahlOptions";
import { renderWithTestTranslations } from "~tests/utils/translationsUtil";

vi.mock("~/middleware/auth.server", () => ({
  authContext: {},
  authMiddleware: vi.fn(),
}));

import VerfahrenNeu from "../verfahren.neu.tsx";

const gerichtOptions: GerichtAuswahlOption[] = [
  {
    value: "bremen",
    label: "Amtsgericht Bremen",
    komplaGerichtId: "bremen",
    isZov: true,
  },
  {
    value: "erding",
    label: "Amtsgericht Erding",
    komplaGerichtId: "erding",
    isZov: false,
  },
  { value: "zov:Z0001", label: "Amtsgericht Hamburg", isZov: true },
];

const SAFE_ID = "DE.BRAK.test";
const OTHER_SAFE_ID = "DE.BRAK.other";

async function renderPage({
  safeId = SAFE_ID,
  authorizedForSafeIds = [SAFE_ID],
}: { safeId?: string | null; authorizedForSafeIds?: string[] } = {}) {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <VerfahrenNeu
          {...({
            loaderData: { gerichtOptions, safeId, authorizedForSafeIds },
          } as unknown as Parameters<typeof VerfahrenNeu>[0])}
        />
      ),
    },
  ]);
  const result = renderWithTestTranslations(<Stub />);
  const select = await result.findByLabelText("Empfängergericht");
  const selectGericht = (value: string) =>
    fireEvent.change(select, { target: { value } });
  const safeIdSelect = result.getByLabelText("SAFE-ID");
  const selectSafeId = (value: string) =>
    fireEvent.change(safeIdSelect, { target: { value } });

  // ZOV_EINGABESYSTEM_URL is still an empty placeholder, and Testing Library
  // (unlike browsers) doesn't treat an <a href=""> as a link
  const getEingabesystemLink = () =>
    result.getByText("Klage mit dem Eingabesystem erstellen").closest("a");

  return {
    ...result,
    selectGericht,
    safeIdSelect,
    selectSafeId,
    getEingabesystemLink,
  };
}

describe("VerfahrenNeuGerichtAuswahl", () => {
  it("shows no options and announces nothing before a court is selected", async () => {
    const { queryByRole, container } = await renderPage();

    expect(
      queryByRole("link", { name: "Klage einreichen in der KomPla" }),
    ).toBeNull();
    expect(container.querySelector("[aria-live]")).toHaveTextContent("");
  });

  it("offers and announces both options for a court of both systems", async () => {
    const { getByRole, container, selectGericht, getEingabesystemLink } =
      await renderPage();

    selectGericht("bremen");

    expect(
      getByRole("link", { name: "Klage einreichen in der KomPla" }),
    ).toHaveAttribute(
      "href",
      "/verfahren/neu/dokumente?gericht=bremen&safeId=DE.BRAK.test",
    );
    expect(getEingabesystemLink()).toBeInTheDocument();
    expect(container.querySelector("[aria-live]")).toHaveTextContent(
      "Für Amtsgericht Bremen verfügbar: Klage einreichen in der KomPla, Klage mit dem Eingabesystem erstellen.",
    );
  });

  it("offers only the KomPla option for a KomPla-only court", async () => {
    const { queryByText, container, selectGericht } = await renderPage();

    selectGericht("erding");

    expect(queryByText("Klage mit dem Eingabesystem erstellen")).toBeNull();
    expect(container.querySelector("[aria-live]")).toHaveTextContent(
      "Für Amtsgericht Erding verfügbar: Klage einreichen in der KomPla.",
    );
  });

  it("offers only the Eingabesystem for a ZOV-only court", async () => {
    const { queryByRole, selectGericht, getEingabesystemLink } =
      await renderPage();

    selectGericht("zov:Z0001");

    expect(
      queryByRole("link", { name: "Klage einreichen in der KomPla" }),
    ).toBeNull();
    expect(getEingabesystemLink()).toBeInTheDocument();
  });

  describe("SAFE-ID selection", () => {
    it("offers the authorized SAFE-IDs and preselects the user's own", async () => {
      const { safeIdSelect, getAllByRole } = await renderPage({
        authorizedForSafeIds: [OTHER_SAFE_ID, SAFE_ID],
      });

      expect(safeIdSelect).toHaveValue(SAFE_ID);
      expect(
        getAllByRole("option")
          .filter((option) => safeIdSelect.contains(option))
          .map((option) => option.textContent),
      ).toEqual([OTHER_SAFE_ID, SAFE_ID]);
    });

    it.each([
      ["has none", null],
      ["isn't authorized", "DE.BRAK.unauthorized"],
    ])(
      "preselects the first authorized SAFE-ID when the user's own %s",
      async (_, safeId) => {
        const { safeIdSelect } = await renderPage({
          safeId,
          authorizedForSafeIds: [OTHER_SAFE_ID, SAFE_ID],
        });

        expect(safeIdSelect).toHaveValue(OTHER_SAFE_ID);
      },
    );

    it("links to the Dokumente step with the selected SAFE-ID", async () => {
      const { getByRole, selectGericht, selectSafeId } = await renderPage({
        authorizedForSafeIds: [SAFE_ID, OTHER_SAFE_ID],
      });

      selectGericht("erding");
      selectSafeId(OTHER_SAFE_ID);

      expect(
        getByRole("link", { name: "Klage einreichen in der KomPla" }),
      ).toHaveAttribute(
        "href",
        `/verfahren/neu/dokumente?gericht=erding&safeId=${OTHER_SAFE_ID}`,
      );
    });
  });
});
