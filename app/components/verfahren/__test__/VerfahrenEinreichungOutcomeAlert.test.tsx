// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it, vi } from "vitest";
import de from "~/services/translations/de";
import VerfahrenEinreichungOutcomeAlert from "../VerfahrenEinreichungOutcomeAlert";

const { belegStatus } = de.routes.verfahrenNeu.step3;
const { form } = de.shared;

function renderOutcomeAlert(
  props: Partial<Parameters<typeof VerfahrenEinreichungOutcomeAlert>[0]> = {},
) {
  const Stub = createRoutesStub([
    {
      path: "/verfahren/:id",
      Component: () => (
        <VerfahrenEinreichungOutcomeAlert
          hasSubmitError={false}
          beleg={null}
          hasValidationIssues={false}
          isValidationErrorFatal={false}
          readinessLabel="Bereit zur Abgabe"
          fehler={[]}
          {...props}
        />
      ),
      action: vi.fn(),
    },
  ]);

  return render(<Stub initialEntries={["/verfahren/v-1"]} />);
}

describe("VerfahrenEinreichungOutcomeAlert", () => {
  it("renders nothing when there is no error, Beleg, or validation issue", () => {
    const { container } = renderOutcomeAlert();

    expect(container).toBeEmptyDOMElement();
  });

  it("shows the generic submit error, taking priority over everything else", () => {
    renderOutcomeAlert({
      hasSubmitError: true,
      hasValidationIssues: true,
      isValidationErrorFatal: true,
      beleg: { id: "b-1", status: "ERSTELLT" } as never,
    });

    expect(screen.getByText(form.submit.title)).toBeInTheDocument();
    expect(screen.getByText(form.submit.message)).toBeInTheDocument();
  });

  it("shows the Beleg status alert when a Beleg exists", () => {
    renderOutcomeAlert({
      beleg: {
        id: "b-1",
        status: "IN_BEARBEITUNG",
        erstellt_am: "2026-08-24T15:18:20.000Z",
        typ: null,
        dateiname: null,
        content_type: null,
      } as never,
      hasValidationIssues: true,
    });

    expect(screen.getByText(belegStatus.pending.headline)).toBeInTheDocument();
  });

  it("shows a fatal validation Alert when ergebnis is ROT", () => {
    renderOutcomeAlert({
      hasValidationIssues: true,
      isValidationErrorFatal: true,
      readinessLabel: "Es liegt ein Problem vor",
      fehler: ["Datei ist beschädigt"],
    });

    expect(screen.getByText("Es liegt ein Problem vor")).toBeInTheDocument();
    expect(screen.getByText("Datei ist beschädigt")).toBeInTheDocument();
  });

  it("shows a warning validation Alert when ergebnis is GELB", () => {
    renderOutcomeAlert({
      hasValidationIssues: true,
      isValidationErrorFatal: false,
      readinessLabel: "Es liegen Hinweise vor",
      fehler: ["Hinweis zur Signatur"],
    });

    expect(screen.getByText("Es liegen Hinweise vor")).toBeInTheDocument();
    expect(screen.getByText("Hinweis zur Signatur")).toBeInTheDocument();
  });
});
