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

import VerfahrenNeuGerichtAuswahl from "../verfahren.neu.gericht-auswahl";

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

async function renderPage() {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <VerfahrenNeuGerichtAuswahl
          {...({ loaderData: { gerichtOptions } } as unknown as Parameters<
            typeof VerfahrenNeuGerichtAuswahl
          >[0])}
        />
      ),
    },
  ]);
  const result = renderWithTestTranslations(<Stub />);
  const select = await result.findByLabelText("Empfängergericht");
  const selectGericht = (value: string) =>
    fireEvent.change(select, { target: { value } });

  // ZOV_EINGABESYSTEM_URL is still an empty placeholder, and Testing Library
  // (unlike browsers) doesn't treat an <a href=""> as a link
  const getEingabesystemLink = () =>
    result.getByText("Klage mit dem Eingabesystem erstellen").closest("a");

  return { ...result, selectGericht, getEingabesystemLink };
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
    ).toHaveAttribute("href", "/verfahren/neu/dokumente?gericht=bremen");
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
});
